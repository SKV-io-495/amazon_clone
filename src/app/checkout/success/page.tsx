import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl text-green-600">✓</span>
      </div>
      <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Thank you for your order. We have received it and will send a confirmation email once your package ships.
      </p>
      <Link href="/">
        <Button variant="primary">Continue Shopping</Button>
      </Link>
    </div>
  );
}
