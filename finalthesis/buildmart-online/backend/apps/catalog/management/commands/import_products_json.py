import json
import os
from django.core.management.base import BaseCommand
from django.core.files import File
from django.utils.text import slugify

from apps.catalog.models import Category, Brand, Product, ProductImage, SpecificationType, ProductSpecification


class Command(BaseCommand):
    help = 'Imports products from sample_products.json into the database.'

    def handle(self, *args, **options):
        # The script is in finalthesis/buildmart-online/backend/apps/catalog/management/commands
        # The project root (finalthesis) is 6 levels up from this script's directory.
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), *['..']*6))

        json_file_path = os.path.join(project_root, 'database', 'space', 'sample_products.json')

        if not os.path.exists(json_file_path):
            self.stderr.write(self.style.ERROR(f'Error: sample_products.json not found at {json_file_path}'))
            return

        with open(json_file_path, 'r', encoding='utf-8') as f:
            products_data = json.load(f)

        self.stdout.write(self.style.SUCCESS('Starting product import...'))
        
        # Clear existing products to avoid duplicates on re-run
        Product.objects.all().delete()
        self.stdout.write(self.style.WARNING('Existing products deleted.'))

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

            product, created = Product.objects.update_or_create(
                name=product_name,
                category=category,
                defaults={
                    'brand': brand,
                    'description': product_data.get('description', ''),
                    'price': product_data.get('price', 0.0),
                    'stock': product_data.get('stock', 10),
                    'available': True,
                    'slug': slugify(product_name, allow_unicode=True),
                }
            )

            if created:
                self.stdout.write(f'Created product: {product.name}')
            else:
                self.stdout.write(f'Updated product: {product.name}')

            # Import Image
            image_path_from_json = product_data.get('image')
            if image_path_from_json:
                image_filename = os.path.basename(image_path_from_json)
                # Construct the full disk path from the project root
                image_disk_path = os.path.join(project_root, image_path_from_json)
                
                if os.path.exists(image_disk_path):
                    # Clear existing images for the product to prevent duplicates
                    product.images.all().delete()
                    with open(image_disk_path, 'rb') as f:
                        product_image = ProductImage(product=product, alt_text=f'{product.name} Image')
                        product_image.image.save(image_filename, File(f), save=True)
                        self.stdout.write(f'  - Added image {image_filename} to {product.name}')
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
