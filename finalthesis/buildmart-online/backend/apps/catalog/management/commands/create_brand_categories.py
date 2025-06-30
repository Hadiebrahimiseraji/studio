from django.core.management.base import BaseCommand
from apps.catalog.models import Category, Brand
from mptt.utils import register

class Command(BaseCommand):
    help = 'Creates default categories and brands for BuildMart Online.'

    def handle(self, *args, **options):
        self.stdout.write('Creating default categories...')

        # Register the Category model with MPTT if not already registered
        try:
            register(Category)
        except:
            pass # Already registered

        # Create root category
        root_category, created = Category.objects.get_or_create(name='All Products', slug='all-products')
        if created:
            self.stdout.write(self.style.SUCCESS(f'Successfully created category: {root_category.name}'))

        # Example subcategories
        categories_to_create = [
            {'name': 'Plumbing', 'slug': 'plumbing', 'parent': root_category},
            {'name': 'Electrical', 'slug': 'electrical', 'parent': root_category},
            {'name': 'HVAC', 'slug': 'hvac', 'parent': root_category},
            {'name': 'Tools & Hardware', 'slug': 'tools-hardware', 'parent': root_category},
            {'name': 'Safety Equipment', 'slug': 'safety-equipment', 'parent': root_category},
        ]

        for cat_data in categories_to_create:
            parent = cat_data.pop('parent')
            category, created = Category.objects.get_or_create(parent=parent, **cat_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created category: {category.name}'))
            else:
                self.stdout.write(self.style.SUCCESS(f'Category already exists: {category.name}'))


        self.stdout.write('Creating default brands...')

        brands_to_create = [
            {'name': 'Bosch', 'slug': 'bosch'},
            {'name': 'Makita', 'slug': 'makita'},
            {'name': 'Grundfos', 'slug': 'grundfos'},
            {'name': 'Schneider Electric', 'slug': 'schneider-electric'},
            {'name': 'Ductso', 'slug': 'ductso'},
            {'name': '3M', 'slug': '3m'},
        ]

        for brand_data in brands_to_create:
            brand, created = Brand.objects.get_or_create(**brand_data)
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created brand: {brand.name}'))
            else:
                 self.stdout.write(self.style.SUCCESS(f'Brand already exists: {brand.name}'))


        self.stdout.write(self.style.SUCCESS('Default categories and brands created successfully.'))