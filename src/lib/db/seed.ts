
import { db } from './index';
import { products, carts, orders, orderItems } from './schema';
import * as dotenv from 'dotenv';

dotenv.config();

const dummyProducts = [
  // Electronics
  {
    title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones, Black',
    description: 'Industry-leading noise cancellation, 30-hour battery life, and crystal-clear hands-free calling.',
    price: '348.00',
    rating: '4.8',
    reviewCount: 12500,
    image: 'https://placehold.co/600x600?text=Sony+Headphones',
    images: ['https://placehold.co/600x600?text=Sony+Back', 'https://placehold.co/600x600?text=Sony+Side'],
    category: 'Electronics',
    stock: 50,
    isPrime: true,
  },
  {
    title: 'Apple iPad Air (5th Generation): with M1 chip, 10.9-inch Liquid Retina Display, 64GB, Space Gray',
    description: 'Immersive 10.9-inch Liquid Retina display. 12MP Wide back camera, 12MP Ultra Wide front camera.',
    price: '559.00',
    rating: '4.9',
    reviewCount: 9800,
    image: 'https://placehold.co/600x600?text=iPad+Air',
    images: ['https://placehold.co/600x600?text=iPad+Side'],
    category: 'Electronics',
    stock: 120,
    isPrime: true,
  },
  {
    title: 'Logitech MX Master 3S - Wireless Performance Mouse, Ultra-Fast Scrolling, Ergo, 8K DPI',
    description: 'Any-surface tracking - now 8K DPI: Use MX Master 3S cordless computer mouse to work on any surface - even glass.',
    price: '99.99',
    rating: '4.7',
    reviewCount: 8500,
    image: 'https://placehold.co/600x600?text=MX+Master+3S',
    images: ['https://placehold.co/600x600?text=Mouse+Side'],
    category: 'Electronics',
    stock: 200,
    isPrime: true,
  },
  {
    title: 'Samsung T7 Shield 2TB, Portable SSD, Photographer, 1050MB/s, Rugged, USBC',
    description: 'Rugged durability: Tough, fast, and compact, the all new PSSD T7 Shield gives you superior performance on the go.',
    price: '119.99',
    rating: '4.8',
    reviewCount: 4500,
    image: 'https://placehold.co/600x600?text=Samsung+SSD',
    images: ['https://placehold.co/600x600?text=SSD+Angle'],
    category: 'Electronics',
    stock: 80,
    isPrime: true,
  },
  {
    title: 'Anker USB C Charger, 735 Charger (Nano II 65W), 3-Port Fast Compact Wall Sockets',
    description: 'The Only Charger You Need: Say goodbye to your old power bricks. Anker 735 Charger (Nano II 65W) has the power you need.',
    price: '39.99',
    rating: '4.8',
    reviewCount: 15600,
    image: 'https://placehold.co/600x600?text=Anker+Charger',
    images: ['https://placehold.co/600x600?text=Charger+Ports'],
    category: 'Electronics',
    stock: 300,
    isPrime: true,
  },
  {
    title: 'Kindle Paperwhite (16 GB) – Now with a 6.8" display and adjustable warm light',
    description: 'All-new Kindle Paperwhite – Now with a 6.8” display and thinner borders, adjustable warm light, up to 10 weeks of battery life.',
    price: '149.99',
    rating: '4.7',
    reviewCount: 32000,
    image: 'https://placehold.co/600x600?text=Kindle+Paperwhite',
    images: ['https://placehold.co/600x600?text=Kindle+Reading'],
    category: 'Electronics',
    stock: 150,
    isPrime: true,
  },
  {
    title: 'Roku Streaming Stick 4K | Portable Roku Streaming Device 4K/HDR/Dolby Vision',
    description: 'Hides behind your TV: The all-new design plugs right into your TV with a simple setup.',
    price: '39.00',
    rating: '4.6',
    reviewCount: 54000,
    image: 'https://placehold.co/600x600?text=Roku+Stick',
    images: ['https://placehold.co/600x600?text=Roku+Remote'],
    category: 'Electronics',
    stock: 500,
    isPrime: false,
  },

  // Books
  {
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
    price: '13.79',
    rating: '4.9',
    reviewCount: 110000,
    image: 'https://placehold.co/600x600?text=Atomic+Habits',
    images: [],
    category: 'Books',
    stock: 1000,
    isPrime: true,
  },
  {
    title: 'The Psychology of Money: Timeless lessons on wealth, greed, and happiness',
    description: 'Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach.',
    price: '10.50',
    rating: '4.8',
    reviewCount: 65000,
    image: 'https://placehold.co/600x600?text=Psychology+of+Money',
    images: [],
    category: 'Books',
    stock: 750,
    isPrime: true,
  },
  {
    title: 'Project Hail Mary: A Novel by Andy Weir',
    description: 'A lone astronaut must save the earth from disaster in this incredible new science-fiction thriller from the #1 New York Times bestselling author of The Martian.',
    price: '14.50',
    rating: '4.9',
    reviewCount: 60000,
    image: 'https://placehold.co/600x600?text=Project+Hail+Mary',
    images: [],
    category: 'Books',
    stock: 400,
    isPrime: true,
  },
  {
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    description: 'Deep work is the ability to focus without distraction on a cognitively demanding task.',
    price: '12.00',
    rating: '4.6',
    reviewCount: 12000,
    image: 'https://placehold.co/600x600?text=Deep+Work',
    images: [],
    category: 'Books',
    stock: 300,
    isPrime: false,
  },
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees.',
    price: '45.00',
    rating: '4.7',
    reviewCount: 7000,
    image: 'https://placehold.co/600x600?text=Clean+Code',
    images: [],
    category: 'Books',
    stock: 150,
    isPrime: true,
  },

  // Home
  {
    title: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    description: 'Dyson’s most powerful, intelligent cordless vacuum. Laser reveals microscopic dust.',
    price: '649.99',
    rating: '4.6',
    reviewCount: 3400,
    image: 'https://placehold.co/600x600?text=Dyson+V15',
    images: ['https://placehold.co/600x600?text=Dyson+Action'],
    category: 'Home',
    stock: 40,
    isPrime: true,
  },
  {
    title: 'Instant Pot Pro 10-in-1 Pressure Cooker, Slow Cooker, Rice/Grain Cooker',
    description: '10-in-1 pressure cooker, slow cooker, rice/grain cooker, streamer, sauté, sous vide, yogurt maker, sterilizer, and warmer.',
    price: '129.95',
    rating: '4.7',
    reviewCount: 22000,
    image: 'https://placehold.co/600x600?text=Instant+Pot',
    images: ['https://placehold.co/600x600?text=Instant+Pot+Food'],
    category: 'Home',
    stock: 250,
    isPrime: true,
  },
  {
    title: 'Keurig K-Elite Single Serve K-Cup Pod Coffee Maker, Brushed Slate',
    description: 'Premium finish and programmable features deliver a modern design and the ultimate beverage customization.',
    price: '145.00',
    rating: '4.8',
    reviewCount: 41000,
    image: 'https://placehold.co/600x600?text=Keurig+Coffee',
    images: [],
    category: 'Home',
    stock: 180,
    isPrime: true,
  },
  {
    title: 'Shark NV360 Navigator Lift-Away Deluxe Upright Vacuum with Large Dust Cup',
    description: 'Lift-Away Pod: Detachable pod for cleaning stairs, furniture, and more.',
    price: '159.99',
    rating: '4.5',
    reviewCount: 18000,
    image: 'https://placehold.co/600x600?text=Shark+Vacuum',
    images: [],
    category: 'Home',
    stock: 100,
    isPrime: true,
  },
  {
    title: 'Philips Hue White and Color Ambiance A19 E26 LED Smart Bulb, Bluetooth & Zigbee',
    description: 'Go bright, go bold with millions of colors and shades of white light, synced to your music and movies.',
    price: '44.99',
    rating: '4.7',
    reviewCount: 12000,
    image: 'https://placehold.co/600x600?text=Philips+Hue',
    images: [],
    category: 'Home',
    stock: 500,
    isPrime: true,
  },
  {
    title: 'DeWalt 20V MAX Cordless Drill / Driver Kit, Compact, 1/2-Inch',
    description: 'Compact, lightweight design fits into tight areas. High performance motor delivers 300 unit watts out (UWO) of power ability.',
    price: '99.00',
    rating: '4.9',
    reviewCount: 41000,
    image: 'https://placehold.co/600x600?text=DeWalt+Drill',
    images: ['https://placehold.co/600x600?text=Drill+Action'],
    category: 'Home',
    stock: 200,
    isPrime: true,
  },
  {
    title: 'Ninja AF101 Air Fryer that Crisps, Roasts, Reheats, & Dehydrates',
    description: 'Now you can enjoy guilt-free food. Air fry with up to 75% less fat than traditional frying methods.',
    price: '99.99',
    rating: '4.8',
    reviewCount: 56000,
    image: 'https://placehold.co/600x600?text=Ninja+Air+Fryer',
    images: [],
    category: 'Home',
    stock: 300,
    isPrime: true,
  },
  {
    title: 'YETI Rambler 20 oz Travel Mug, Stainless Steel, Vacuum Insulated',
    description: 'The Rambler 20 oz. Travel Mug is made from durable stainless steel with double-wall vacuum insulation to protect your hot or cold beverage at all costs.',
    price: '35.00',
    rating: '4.9',
    reviewCount: 9500,
    image: 'https://placehold.co/600x600?text=YETI+Mug',
    images: [],
    category: 'Home',
    stock: 450,
    isPrime: true,
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  try {
    // Clean up existing data
    console.log('Can\'t delete due to cascade issues? No, drizzle handles this typically, but let\'s proceed carefully.');
    // await db.delete(orderItems);
    // await db.delete(orders);
    // await db.delete(carts);
    // await db.delete(products);

    // Insert products
    console.log('Inserting products...');
    await db.insert(products).values(dummyProducts);
    
    console.log(`✅ Database seeded successfully with ${dummyProducts.length} products`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();
