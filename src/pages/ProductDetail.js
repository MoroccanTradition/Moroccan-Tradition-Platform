import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../services/Api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await fetchProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-4">
      <img 
        src={product.imageUrl || '/placeholder-product.jpg'} 
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl mb-4">${product.price}</p>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {product.category}
          </span>
        </div>
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;