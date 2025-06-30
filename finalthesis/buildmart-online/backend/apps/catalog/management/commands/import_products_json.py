import json
import os
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.conf import settings

from apps.catalog.models import Category, Brand, Product, ProductImage, SpecificationType, ProductSpecification


class Command(BaseCommand):
    help = 'Imports products from sample_products.json into the database.'

    def handle(self, *args, **options):
        # The path to the json file is relative to the project root (finalthesis)
        project_root = settings.BASE_DIR.parent.parent.parent
        json_file_path = os.path.join(project_root, 'database', 'space', 'sample_products.json')

        if not os.path.exists(json_file_path):
            self.stderr.write(self.style.ERROR(f'Error: sample_products.json not found at {json_file_path}'))
            return

        with open(json_file_path, 'r', encoding='utf-8') as f:
            products_data = json.load(f)

        self.stdout.write(self.style.SUCCESS('Starting product import...'))
        
        Product.objects.all().delete()
        ProductImage.objects.all().delete()
        self.stdout.write(self.style.WARNING('Existing products and images deleted.'))

        for product_data in products_data:
            category_name = product_data.get('category')
            if not category_name:
                self.stderr.write(self.style.WARNING('Skipping product with no category name.'))
                continue
            
            category, _ = Category.objects.get_or_create(
                name=category_name,
                defaults={'slug': slugify(category_name, allow_unicode=True)}
            )

            brand_name = product_data.get('brand')
            brand = None
            if brand_name:
                brand, _ = Brand.objects.get_or_create(
                    name=brand_name,
                    defaults={'slug': slugify(brand_name)}
                )

            product_name = product_data.get('title')
            if not product_name:
                self.stderr.write(self.style.WARNING('Skipping product with no title.'))
                continue

            product_slug = slugify(product_name, allow_unicode=True)
            # Ensure slug is unique
            unique_slug = product_slug
            counter = 1
            while Product.objects.filter(slug=unique_slug).exists():
                unique_slug = f'{product_slug}-{counter}'
                counter += 1

            product, created = Product.objects.update_or_create(
                slug=unique_slug,
                defaults={
                    'name': product_name,
                    'category': category,
                    'brand': brand,
                    'description': product_data.get('description', ''),
                    'price': product_data.get('price', 0.0),
                    'stock': product_data.get('stock', 10),
                    'available': True,
                }
            )

            if created:
                self.stdout.write(f'Created product: {product.name}')
            else:
                self.stdout.write(f'Updated product: {product.name}')

            # Import Image by linking the existing path
            image_path_from_json = product_data.get('image')
            if image_path_from_json and image_path_from_json.strip():
                # The full path on disk to check for existence
                image_disk_path = os.path.join(project_root, image_path_from_json)
                
                if os.path.exists(image_disk_path):
                    # The path stored in the DB must be relative to MEDIA_ROOT.
                    # MEDIA_ROOT is '.../finalthesis/database/'.
                    # image_path_from_json is 'database/image/1/p-123.jpg'.
                    # We need to store 'image/1/p-123.jpg' in the database.
                    db_image_path = image_path_from_json.replace('database/', '', 1)

                    product_image = ProductImage(product=product, alt_text=f'{product.name} Image')
                    product_image.image.name = db_image_path
                    product_image.save()
                    self.stdout.write(f'  - Linked image {db_image_path} to {product.name}')
                else:
                    self.stderr.write(self.style.WARNING(f'  - Image file not found: {image_disk_path} for product {product.name}'))

            # Import Specifications (if any)
            specifications_data = product_data.get('specs', {})
            if specifications_data:
                product.specifications.all().delete()
                for spec_name, spec_value in specifications_data.items():
                    spec_type, _ = SpecificationType.objects.get_or_create(
                        name=spec_name
                    )
                    ProductSpecification.objects.create(
                        product=product,
                        specification_type=spec_type,
                        value=str(spec_value)
                    )

        self.stdout.write(self.style.SUCCESS('Product import finished.'))
