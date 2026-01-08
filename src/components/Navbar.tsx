import Link from 'next/link';
import Image from 'next/image';
import ClientNavbar from '@/components/ClientNavbar';
import CartIcon from './CartIcon';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers() // Ensure headers is awaited for Next.js 15+ if needed, or just passed
  });

  return <ClientNavbar cartIcon={<CartIcon />} session={session} />;
}
