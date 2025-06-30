from django.core.management.base import BaseCommand
from django.utils.text import slugify
from apps.catalog.models import Category, Brand

class Command(BaseCommand):
    help = 'Creates default categories and brands for BuildMart Online.'

    def handle(self, *args, **options):
        self.stdout.write('Creating default categories and brands...')

        # Deleting existing data to avoid conflicts
        Category.objects.all().delete()
        Brand.objects.all().delete()
        self.stdout.write(self.style.WARNING('Existing categories and brands deleted.'))

        categories_data = [
            'لوله واتصالات پنج لایه نیوپایپ',
            'لوله و اتصالات تک لایه آذین',
            'لوله و اتصالات فاضلابی مولتی پایپ',
            'محصولات پلی اتیلن آبیاری دینا پلیمر',
        ]

        brands_data = {
            'لوله واتصالات پنج لایه نیوپایپ': 'NewPipe',
            'لوله و اتصالات تک لایه آذین': 'Azin',
            'لوله و اتصالات فاضلابی مولتی پایپ': 'MultiPipe',
            'محصولات پلی اتیلن آبیاری دینا پلیمر': 'DinaPolymer',
        }

        for cat_name in categories_data:
            slug = slugify(cat_name, allow_unicode=True)
            category, created = Category.objects.get_or_create(
                name=cat_name,
                defaults={'slug': slug}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Successfully created category: {category.name}'))

            brand_name = brands_data.get(cat_name)
            if brand_name:
                brand_slug = slugify(brand_name)
                brand, created = Brand.objects.get_or_create(
                    name=brand_name,
                    defaults={'slug': brand_slug}
                )
                if created:
                    self.stdout.write(self.style.SUCCESS(f'Successfully created brand: {brand.name}'))

        self.stdout.write(self.style.SUCCESS('Default categories and brands created successfully.'))
