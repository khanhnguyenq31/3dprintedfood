import { motion } from 'motion/react';
import { Printer, Leaf, Zap, Users, Sparkles, ChefHat, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function InformationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section - Gestalt: Figure/Ground */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <motion.div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-6"
          style={{
            background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
            boxShadow: '0 8px 32px rgba(161, 140, 209, 0.25)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-white">Revolutionary Food Technology</span>
        </motion.div>
        <h1 className="text-5xl mb-6">What is 3D Printed Food?</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          PrintFood uses advanced additive manufacturing to create perfectly customized meals
          with precision nutrition, zero waste, and infinite variety.
        </p>
      </motion.div>

      {/* Benefits Grid - Gestalt: Proximity & Similarity */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[
          {
            icon: <Leaf className="w-8 h-8" />,
            title: 'Sustainable',
            description: 'Zero food waste and eco-friendly production',
            gradient: 'linear-gradient(135deg, #89d4cf 0%, #a8e6cf 100%)',
          },
          {
            icon: <Zap className="w-8 h-8" />,
            title: 'Fast',
            description: 'Custom meals in minutes, not hours',
            gradient: 'linear-gradient(135deg, #ffa8b5 0%, #ffc4d6 100%)',
          },
          {
            icon: <Users className="w-8 h-8" />,
            title: 'Personalized',
            description: 'Tailored to your exact nutritional needs',
            gradient: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
          },
          {
            icon: <ChefHat className="w-8 h-8" />,
            title: 'Delicious',
            description: 'Gourmet quality with every print',
            gradient: 'linear-gradient(135deg, #ffd89b 0%, #ffe5b4 100%)',
          },
        ].map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="p-8 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(163, 177, 198, 0.3)' }}
          >
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white"
              style={{ background: benefit.gradient }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {benefit.icon}
            </motion.div>
            <h3 className="mb-3">{benefit.title}</h3>
            <p className="text-sm text-muted-foreground">{benefit.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Technology Workflow - Gestalt: Continuity & Alignment */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            From design to delivery in four simple steps
          </p>
        </div>

        <div className="relative">
          {/* Connection Line - Gestalt: Continuity */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 via-cyan-300 to-pink-300 -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {[
              {
                step: '01',
                icon: <Lightbulb className="w-10 h-10" />,
                title: 'Design Your Meal',
                description: 'Choose your food type and customize every parameter using our intuitive configurator',
                color: '#a18cd1',
              },
              {
                step: '02',
                icon: <Zap className="w-10 h-10" />,
                title: 'AI Optimization',
                description: 'Our AI analyzes your preferences and optimizes nutrition, texture, and flavor profile',
                color: '#89d4cf',
              },
              {
                step: '03',
                icon: <Printer className="w-10 h-10" />,
                title: '3D Printing',
                description: 'Advanced food printers create your meal layer by layer with precision ingredients',
                color: '#ffa8b5',
              },
              {
                step: '04',
                icon: <CheckCircle2 className="w-10 h-10" />,
                title: 'Enjoy!',
                description: 'Your perfectly customized meal is packaged and delivered fresh to your door',
                color: '#ffd89b',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                <div
                  className="p-8 rounded-3xl h-full"
                  style={{
                    background: '#ffffff',
                    boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  {/* Step Number Badge */}
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 relative z-10"
                    style={{
                      background: `linear-gradient(135deg, ${step.color} 0%, ${step.color}99 100%)`,
                      boxShadow: `0 0 20px ${step.color}40`,
                    }}
                  >
                    <span className="text-white text-sm">{step.step}</span>
                  </div>

                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mx-auto"
                    style={{
                      background: `${step.color}15`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <div style={{ color: step.color }}>
                      {step.icon}
                    </div>
                  </motion.div>

                  <h3 className="text-center mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features - Gestalt: Common Region */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-12 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
          boxShadow: '0 20px 60px rgba(161, 140, 209, 0.3)',
        }}
      >
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl mb-4">Why Choose PrintFood?</h2>
          <p className="text-lg text-white/90">
            The future of food is here, and it's personalized for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Customizable macro ratios',
            'Allergen-free options',
            'Sustainable ingredients',
            'Portion control',
            'Nutritional transparency',
            'Endless variety',
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm"
            >
              <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
              <span className="text-white">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
