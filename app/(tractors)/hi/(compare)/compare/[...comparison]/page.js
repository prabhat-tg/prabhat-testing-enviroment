import CompareTractorsPage from '@/src/features/tractors/CompareTractorsPage';
import '../../../../../tyreGlobals.css';
export const dynamic = 'force-dynamic';

export default async function page({ params }) {
  return <CompareTractorsPage params={params} />;
}
