import json
import os
from django.core.management.base import BaseCommand, CommandError
from django.utils.text import slugify
from apps.catalog.models import Product, Category

class Command(BaseCommand):
    help = 'Imports product data from a JSON file, creating categories if they do not exist.'

    def handle(self, *args, **options):
        # Clear existing data
        self.stdout.write('Clearing existing product and category data...')
        Product.objects.all().delete()
        Category.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Data cleared.'))

        # The path to the json file is relative to the project root (finalthesis)
        project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', '..', '..'))
        json_file_path = os.path.join(project_root, 'finalthesis', 'database', 'space', 'sample_products.json')

        if not os.path.exists(json_file_path):
            raise CommandError(f'File "{json_file_path}" does not exist.')

        self.stdout.write(self.style.SUCCESS(f'Starting import from {json_file_path}...'))

        try:
            with open(json_file_path, mode='r', encoding='utf-8') as file:
                data = json.load(file)

            created_count = 0

            for item in data:
                category_name = item.get('category')
                if not category_name:
                    self.stdout.write(self.style.WARNING(f"Skipping item due to missing category: {item.get('name')}"))
                    continue

                # Get or create category
                category_slug = slugify(category_name, allow_unicode=True)
                category, cat_created = Category.objects.get_or_create(
                    name=category_name,
                    defaults={'slug': category_slug, 'description': f'محصولات دسته‌بندی {category_name}'}
                )
                if cat_created:
                    self.stdout.write(self.style.SUCCESS(f'Created new category: {category_name}'))

                product_name = item.get('name')
                if not product_name:
                    self.stdout.write(self.style.WARNING("Skipping item due to missing name."))
                    continue
                
                product_slug = slugify(product_name, allow_unicode=True)
                # Ensure slug is unique
                unique_slug = product_slug
                counter = 1
                while Product.objects.filter(slug=unique_slug).exists():
                    unique_slug = f'{product_slug}-{counter}'
                    counter += 1

                product_image_path = item.get('image')

                product = Product(
                    name=product_name,
                    slug=unique_slug,
                    description=item.get('description', ''),
                    price=item.get('price', '0.00'),
                    category=category
                )

                if product_image_path:
                    product.image.name = product_image_path

                product.save()
                created_count += 1

            self.stdout.write(self.style.SUCCESS(f'Successfully imported {created_count} products.'))

        except Exception as e:
            raise CommandError(f'Error importing data: {e}')
