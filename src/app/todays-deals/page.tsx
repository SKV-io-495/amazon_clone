import TodaysDealsContent from '@/components/pages/TodaysDealsContent';
import { getProducts } from '@/lib/actions/product';

export default async function TodaysDealsPage() {
  const products = await getProducts();
  return <TodaysDealsContent products={products} />;
}
