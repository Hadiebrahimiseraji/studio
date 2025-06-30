import json
import os
from django.core.management.base import BaseCommand
from django.core.files import File
from django.utils.text import slugify

from apps.catalog.models import Category, Brand, Product, ProductImage, SpecificationType, ProductSpecification


class Command(BaseCommand):
    help = 'Imports products from sample_products.json into the database.'

    def handle(self, *args, **options):
        json_file_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'database', 'space', 'sample_products.json')

        if not os.path.exists(json_file_path):
            self.stderr.write(self.style.ERROR(f'Error: sample_products.json not found at {json_file_path}'))
            return

        with open(json_file_path, 'r', encoding='utf-8') as f:
            products_data = json.load(f)

        self.stdout.write(self.style.SUCCESS('Starting product import...'))

        for product_data in products_data:
            # Get or create Category
            category_name = product_data.get('category', 'Uncategorized')
            category, created = Category.objects.get_or_create(
                name=category_name,
                slug=slugify(category_name)
            )
            if created:
                self.stdout.write(f'Created category: {category_name}')

            # Get or create Brand (assuming brand is part of product data if needed)
            # For now, we'll skip brand or assume a default if not in JSON

            # Create Product
            product, created = Product.objects.get_or_create(
                id=product_data.get('id'), # Assuming ID is in JSON and unique
                defaults={
                    'name': product_data.get('name'),
                    'category': category,
                    'description': product_data.get('description', ''),
                    'price': product_data.get('price', 0.0),
                    'stock': product_data.get('stock', 0),
                    'available': product_data.get('available', True),
                    'slug': slugify(product_data.get('name', '')),
                }
            )

            if created:
                self.stdout.write(f'Created product: {product.name}')
            else:
                self.stdout.write(f'Product with ID {product.id} already exists, skipping creation.')
                continue # Skip if product already exists based on ID

            # Import Images
            image_urls = product_data.get('image_urls', [])
            for i, image_url in enumerate(image_urls):
                # Assuming image_url is just the filename relative to database/images/
                image_filename = os.path.basename(image_url)
                image_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', 'database', 'images', image_filename)

                if os.path.exists(image_path):
                    with open(image_path, 'rb') as f:
                        product_image = ProductImage(product=product, alt_text=f'{product.name} Image {i+1}')
                        product_image.image.save(image_filename, File(f), save=True)
                        self.stdout.write(f'Added image {image_filename} to {product.name}')
                else:
                    self.stderr.write(self.style.WARNING(f'Image file not found: {image_path}'))


            # Import Specifications (Assuming 'specifications' is a dict in JSON)
            specifications_data = product_data.get('specifications', {})
            for spec_name, spec_value in specifications_data.items():
                spec_type, created = SpecificationType.objects.get_or_create(
                    name=spec_name
                )
                if created:
                    self.stdout.write(f'Created specification type: {spec_name}')

                ProductSpecification.objects.create(
                    product=product,
                    type=spec_type,
                    value=str(spec_value) # Store value as string
                )
                # self.stdout.write(f'Added specification "{spec_name}: {spec_value}" to {product.name}')


        self.stdout.write(self.style.SUCCESS('Product import finished.'))