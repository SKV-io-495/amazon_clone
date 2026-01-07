import Link from 'next/link';
import Image from 'next/image';
import ClientNavbar from './ClientNavbar';
import CartIcon from './CartIcon';

export default function Navbar() {
  return <ClientNavbar cartIcon={<CartIcon />} />;
}
