import { useState, useEffect } from 'react';
import { Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../lib/api';
import { Link } from 'react-router-dom';
import { WishlistOut, ProductOut } from '../types/api';

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<ProductOut[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const wishlistItems = await api.get<WishlistOut[]>('/wishlist');

        if (wishlistItems.length === 0) {
          setWishlistProducts([]);
          setIsLoading(false);
          return;
        }

        const productPromises = wishlistItems.map(item =>
          api.get<ProductOut>(`/catalog/products/${item.product_id}`)
            .catch(err => {
              console.error(`Failed to load product ${item.product_id}`, err);
              return null;
            })
        );

        const products = await Promise.all(productPromises);
        const validProducts = products.filter((p): p is ProductOut => p !== null);
        setWishlistProducts(validProducts);

      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (isLoading) {
    return <div className="p-16 text-center">Loading wishlist...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-pink-400" />
        <h1 className="text-3xl font-semibold">My Wishlist</h1>
      </div>
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-300" />
          <div className="mb-2 text-lg">Your wishlist is empty.</div>
          <div>Add products to your wishlist to save them for later!</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wishlistProducts.map(item => (
            <Link to={`/product/${item.id}`} key={item.id}>
              <motion.div
                className="rounded-3xl overflow-hidden bg-white shadow-lg cursor-pointer h-full"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400'}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="mb-2 font-semibold">{item.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">${item.price}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm">4.5</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}