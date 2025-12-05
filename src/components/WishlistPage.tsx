import { Heart, Star } from 'lucide-react';
import { motion } from 'motion/react';

const wishlistItems = [
  { id: 1, name: 'Classic 3D Burger', price: 12.99, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', rating: 4.8 },
  { id: 2, name: 'Rainbow Layer Cake', price: 24.99, image: 'https://images.unsplash.com/photo-1635822161882-b82ffacd8278?w=400', rating: 4.9 },
];

export default function WishlistPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-pink-400" />
        <h1 className="text-3xl font-semibold">My Wishlist</h1>
      </div>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-4 text-pink-300" />
          <div className="mb-2 text-lg">Your wishlist is empty.</div>
          <div>Add products to your wishlist to save them for later!</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {wishlistItems.map(item => (
            <motion.div
              key={item.id}
              className="rounded-3xl overflow-hidden bg-white shadow-lg cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h4 className="mb-2 font-semibold">{item.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">${item.price}</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}