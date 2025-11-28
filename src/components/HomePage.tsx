import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function HomePage() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'burger',
      name: 'Burgers',
      emoji: '🍔',
      description: 'Customize protein, veggies & sauce',
      gradient: 'linear-gradient(135deg, rgb(201, 57, 79) 0%, #ffc4d6 100%)',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyfGVufDF8fHx8MTc2NDMyMjA3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'cake',
      name: 'Cakes',
      emoji: '🎂',
      description: 'Adjust sweetness, size & flavor',
      gradient: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
      image: 'https://images.unsplash.com/photo-1635822161882-b82ffacd8278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNha2V8ZW58MXx8fHwxNzY0MzMwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 'candy',
      name: 'Candy',
      emoji: '🍬',
      description: 'Control shape, color & sweetness',
      gradient: 'linear-gradient(135deg, rgb(48, 218, 207) 0%, #a8e6cf 100%)',
      image: 'https://images.unsplash.com/photo-1720924109595-161e675c792f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5keSUyMHN3ZWV0c3xlbnwxfHx8fDE3NjQzMTExNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const recommendedProducts = [
    {
      id: 1,
      name: 'Classic 3D Burger',
      category: 'Burger',
      price: 12.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyfGVufDF8fHx8MTc2NDMyMjA3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      featured: true,
    },
    {
      id: 2,
      name: 'Rainbow Layer Cake',
      category: 'Cake',
      price: 24.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1635822161882-b82ffacd8278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGNha2V8ZW58MXx8fHwxNzY0MzMwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      featured: true,
    },
    {
      id: 3,
      name: 'Gourmet Gummy Mix',
      category: 'Candy',
      price: 8.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1720924109595-161e675c792f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5keSUyMHN3ZWV0c3xlbnwxfHx8fDE3NjQzMTExNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      featured: false,
    },
    {
      id: 4,
      name: 'Protein Power Burger',
      category: 'Burger',
      price: 15.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyfGVufDF8fHx8MTc2NDMyMjA3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      featured: false,
    },
  ];

  return (
    <div>
      {/* Hero Section - Gestalt: Figure/Ground & Symmetry */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: 'linear-gradient(135deg,rgb(201, 57, 79) 0%, #ffc4d6 100%)',
                  boxShadow: '0 8px 32px rgba(255, 168, 181, 0.3)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm text-white">Future of Food Technology</span>
              </motion.div>

              <h1 className="text-6xl mb-6 leading-tight">
                Design Your
                <br />
                <span
                  className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                >
                  Perfect Meal
                </span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                Experience the future of dining with 3D-printed food. Customize every ingredient,
                optimize nutrition, and enjoy zero-waste gourmet meals.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={() => navigate('/configurator/1')}
                  className="px-8 py-4 rounded-2xl text-white flex items-center gap-2 group"
                  style={{
                    background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
                    boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
                  }}
                  whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(161, 140, 209, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Customizing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={() => navigate('/information')}
                  className="px-8 py-4 rounded-2xl flex items-center gap-2"
                  style={{
                    background: '#ffffff',
                    boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </div>

              {/* Stats - Gestalt: Proximity */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                {[
                  { label: 'Products', value: '500+' },
                  { label: 'Happy Customers', value: '10K+' },
                  { label: 'Saved Waste', value: '95%' },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="text-3xl mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden"
                style={{
                  boxShadow: '20px 20px 60px rgba(163, 177, 198, 0.3), -20px -20px 60px rgba(255, 255, 255, 0.8)',
                }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1553678324-f84674bd7b24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZm9vZCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY0MzMwMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="3D Printed Food Technology"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 px-6 py-4 rounded-2xl backdrop-blur-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div>95% Less Waste</div>
                    <div className="text-sm text-muted-foreground">Eco-friendly</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Cards - Gestalt: Similarity & Common Region */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Browse Categories</h2>
          <p className="text-lg text-muted-foreground">
            Choose your favorite type and customize every detail
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/search?category=${category.id}`)}
              className="group cursor-pointer"
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-5xl mb-2">{category.emoji}</div>
                    <h3 className="text-2xl mb-1">{category.name}</h3>
                  </div>
                </div>
                <div
                  className="p-6"
                  style={{ background: category.gradient }}
                >
                  <p className="text-white mb-4">{category.description}</p>
                  <motion.div
                    className="flex items-center gap-2 text-white"
                    whileHover={{ x: 5 }}
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommended Products - Gestalt: Alignment & Proximity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl mb-2">Trending Now</h2>
            <p className="text-lg text-muted-foreground">Most popular customizable meals</p>
          </div>
          <motion.button
            onClick={() => navigate('/search')}
            className="px-6 py-3 rounded-2xl flex items-center gap-2"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
            whileHover={{ scale: 1.05 }}
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer"
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: '#ffffff',
                  boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.featured && (
                    <div
                      className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs text-white flex items-center gap-1"
                      style={{
                        background: 'linear-gradient(135deg, #ffa8b5 0%, #ffc4d6 100%)',
                      }}
                    >
                      <Star className="w-3 h-3 fill-white" />
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-muted-foreground mb-2">{product.category}</div>
                  <h4 className="mb-3">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">${product.price}</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
