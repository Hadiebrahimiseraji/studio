import type { Product, Category } from './types';

const categories: Category[] = [
  { id: 'newpipe', name: 'لوله و اتصالات پنج لایه نیوپایپ', imageUrl: '/images/categories/newpipe.png' },
  { id: 'azin', name: 'لوله و اتصالات تک لایه آذین', imageUrl: '/images/categories/azin.png' },
  { id: 'multipipe', name: 'لوله و اتصالات فاضلابی مولتی پایپ', imageUrl: '/images/categories/multipipe.png' },
  { id: 'dina-polymer', name: 'محصولات پلی اتیلن آبیاری دینا پلیمر', imageUrl: '/images/categories/dina-polymer.png' },
];

const products: Product[] = [
  // Newpipe
  {
    id: '1',
    name: 'کلکتور',
    category: 'newpipe',
    price: 150000,
    description: 'کلکتور با کیفیت بالا برای سیستم های لوله کشی پنج لایه.',
    imageUrl: '/images/products/1.png',
    images: ['/images/products/1.png', '/images/products/1-2.png', '/images/products/1-3.png'],
    specifications: [
      { name: 'جنس', value: 'برنج' },
      { name: 'نوع اتصال', value: 'پرسی/کوپلی' },
    ],
    featured: true,
  },
  {
    id: '2',
    name: 'لوله نیوپایپ (PEX_b/AL/PEX_b)',
    category: 'newpipe',
    price: 25000,
    description: 'لوله پنج لایه نیوپایپ با ساختار PEX/AL/PEX برای مقاومت و دوام بالا.',
    imageUrl: '/images/products/2.png',
    images: ['/images/products/2.png'],
    specifications: [
      { name: 'ساختار', value: 'PEX_b/AL/PEX_b' },
      { name: 'فشار کاری', value: '10 بار' },
    ],
  },
  {
    id: '3',
    name: 'زانو دیواری پرسی',
    category: 'newpipe',
    price: 35000,
    description: 'اتصال زانویی پرسی برای نصب روی دیوار.',
    imageUrl: '/images/products/3.png',
    images: ['/images/products/3.png'],
    specifications: [
      { name: 'نوع', value: 'زانو دیواری' },
      { name: 'اتصال', value: 'پرسی' },
    ],
  },

  // Azin
  {
    id: '4',
    name: 'لوله تک لایه سفید PPR',
    category: 'azin',
    price: 15000,
    description: 'لوله تک لایه سفید از جنس پلی پروپیلن برای سیستم های آب سرد و گرم.',
    imageUrl: '/images/products/4.png',
    images: ['/images/products/4.png'],
    specifications: [
      { name: 'جنس', value: 'PPR' },
      { name: 'رنگ', value: 'سفید' },
    ],
    featured: true,
  },
  {
    id: '5',
    name: 'زانو 90 درجه',
    category: 'azin',
    price: 5000,
    description: 'زانو 90 درجه برای تغییر مسیر لوله.',
    imageUrl: '/images/products/5.png',
    images: ['/images/products/5.png'],
    specifications: [
      { name: 'زاویه', value: '90 درجه' },
      { name: 'جنس', value: 'PPR' },
    ],
  },
  {
    id: '6',
    name: 'شیر فلکه کامل',
    category: 'azin',
    price: 80000,
    description: 'شیر فلکه کامل برای کنترل جریان آب در سیستم های تک لایه.',
    imageUrl: '/images/products/6.png',
    images: ['/images/products/6.png'],
    specifications: [
      { name: 'نوع', value: 'شیر فلکه' },
      { name: 'جنس مغزی', value: 'برنجی' },
    ],
  },
  
  // Multipipe
  {
    id: '7',
    name: 'لوله فاضلابی PVC-U (BD)',
    category: 'multipipe',
    price: 30000,
    description: 'لوله فاضلابی از جنس PVC-U با مقاومت بالا.',
    imageUrl: '/images/products/7.png',
    images: ['/images/products/7.png'],
    specifications: [
        { name: 'جنس', value: 'PVC-U' },
        { name: 'کاربرد', value: 'فاضلاب' },
    ],
    featured: true,
  },
  {
    id: '8',
    name: 'سیفون PVC-U',
    category: 'multipipe',
    price: 45000,
    description: 'سیفون فاضلابی برای جلوگیری از بازگشت بو.',
    imageUrl: '/images/products/8.png',
    images: ['/images/products/8.png'],
    specifications: [
        { name: 'جنس', value: 'PVC-U' },
        { name: 'ویژگی', value: 'با دریچه بازدید' },
    ],
  },

  // Dina Polymer
  {
    id: '9',
    name: 'لوله پلی اتیلن PE100',
    category: 'dina-polymer',
    price: 50000,
    description: 'لوله پلی اتیلن PE100 با فشار 10 اتمسفر برای سیستم های آبیاری.',
    imageUrl: '/images/products/9.png',
    images: ['/images/products/9.png'],
    specifications: [
        { name: 'جنس', value: 'PE100' },
        { name: 'فشار', value: '10 اتمسفر' },
    ],
    featured: true,
  },
   {
    id: '10',
    name: 'زانو لوله های آبیاری',
    category: 'dina-polymer',
    price: 7000,
    description: 'اتصال زانویی برای لوله های پلی اتیلن در سیستم های آبیاری.',
    imageUrl: '/images/products/10.png',
    images: ['/images/products/10.png'],
    specifications: [
        { name: 'نوع', value: 'زانویی' },
        { name: 'کاربرد', value: 'آبیاری' },
    ],
  },
   {
    id: '11',
    name: 'سه راهی پرسی',
    category: 'newpipe',
    price: 40000,
    description: 'اتصال سه راهی پرسی برای انشعاب گیری.',
    imageUrl: '/images/products/11.png',
    images: ['/images/products/11.png'],
    specifications: [
      { name: 'نوع', value: 'سه راهی' },
      { name: 'اتصال', value: 'پرسی' },
    ],
    featured: false,
  },
  {
    id: '12',
    name: 'سه راهی',
    category: 'azin',
    price: 6000,
    description: 'سه راهی ساده برای انشعاب در لوله کشی تک لایه.',
    imageUrl: '/images/products/12.png',
    images: ['/images/products/12.png'],
    specifications: [
      { name: 'جنس', value: 'PPR' },
      { name: 'نوع', value: 'سه راهی مساوی' },
    ],
    featured: false,
  },
];

export function getCategories(): Category[] {
  return categories;
}

export function getProducts(category?: string): Product[] {
  if (category) {
    return products.filter((p) => p.category === category);
  }
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
    return products.filter(p => p.featured);
}

export function searchProducts(query: string): Product[] {
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
}
