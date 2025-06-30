import json
import os
from django.core.management.base import BaseCommand, CommandError
from django.conf import settings
from apps.catalog.models import Product, Category

class Command(BaseCommand):
    help = 'Imports product data from a JSON file, creating categories if they do not exist.'

    def handle(self, *args, **options):
        # Path to the json file, assuming it's in the 'finalthesis/database/space' directory
        project_root = os.path.abspath(os.path.join(settings.BASE_DIR, '..', '..'))
        json_file_path = os.path.join(project_root, 'database', 'space', 'sample_products.json')

        if not os.path.exists(json_file_path):
            raise CommandError(f'File "{json_file_path}" does not exist.')

        self.stdout.write(self.style.SUCCESS(f'Starting import from {json_file_path}...'))

        try:
            with open(json_file_path, mode='r', encoding='utf-8') as file:
                data = json.load(file)

            # Clear existing data to avoid duplicates
            Product.objects.all().delete()
            Category.objects.all().delete()
            self.stdout.write(self.style.WARNING('Cleared existing Product and Category data.'))

            created_count = 0
            for item in data:
                category_name = item.get('category')
                if not category_name:
                    self.stdout.write(self.style.WARNING(f"Skipping item due to missing category: {item.get('name')}"))
                    continue

                # Get or create the category
                category, created = Category.objects.get_or_create(
                    name=category_name,
                    defaults={'description': f'محصولات دسته‌بندی {category_name}'}
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f'Created new category: {category_name}'))

                product_name = item.get('name')
                if not product_name:
                    self.stdout.write(self.style.WARNING("Skipping item due to missing name."))
                    continue
                
                # Create the product instance
                product = Product(
                    name=product_name,
                    description=item.get('description', ''),
                    price=item.get('price', '0.00'),
                    category=category
                )

                # Assign the image path. The ImageField will handle it relative to MEDIA_ROOT.
                product_image_path = item.get('image')
                if product_image_path:
                    product.image.name = product_image_path

                product.save()
                created_count += 1

            self.stdout.write(self.style.SUCCESS(f'Successfully imported {created_count} products.'))

        except Exception as e:
            raise CommandError(f'Error importing data: {e}')
