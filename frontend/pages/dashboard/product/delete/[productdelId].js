import { useRouter } from 'next/router';
import ProductDetails from './productdetails';

const ProductDeletePage = () => {
  const router = useRouter();
  const { productdelId } = router.query;

  if (!productdelId) {
    return <div>ID not found</div>; 
  }

  return (
    <div>
      <ProductDetails productdelId={productdelId} />
    </div>
  );
};

export default ProductDeletePage;
