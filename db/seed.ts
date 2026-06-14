import 'dotenv/config';
import { db } from './index';

import {
  users,
  webappContents,
  products,
} from './schema';

import {
  usersSeed,
  webappContentsSeed,
  productsSeed,
} from '@/lib/data';

async function seed() {
  try {
    console.log('DATABASE_URL:', process.env.DATABASE_URL!);
    console.log('Starting database seed...');

    console.log('Clearing existing data...');

    await db.delete(products);
    await db.delete(webappContents);
    await db.delete(users);

    console.log('Seeding users...');
    await db.insert(users).values(usersSeed);

    console.log('Seeding website content...');
    await db
      .insert(webappContents)
      .values(webappContentsSeed);

    console.log('Seeding products...');
    await db.insert(products).values(productsSeed);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seed failed');
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
}

seed();