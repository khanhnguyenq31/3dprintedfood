import { motion } from 'motion/react';
import { Palette, Type, Layout, Sparkles } from 'lucide-react';

export default function StyleGuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl mb-4">Design System</h1>
        <p className="text-xl text-muted-foreground">
          PrintFood's futuristic neumorphic design language
        </p>
      </div>

      {/* Color Palette - Gestalt: Similarity & Common Region */}
      <Section
        title="Color Palette"
        subtitle="Pastel tech colors with soft gradients"
        icon={<Palette className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColorCard
            name="Primary Purple"
            gradient="linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)"
            description="Main brand color for primary actions and highlights"
          />
          <ColorCard
            name="Secondary Cyan"
            gradient="linear-gradient(135deg, #89d4cf 0%, #a8e6cf 100%)"
            description="Secondary actions and success states"
          />
          <ColorCard
            name="Accent Pink"
            gradient="linear-gradient(135deg, #ffa8b5 0%, #ffc4d6 100%)"
            description="Highlights, badges, and featured elements"
          />
        </div>
      </Section>

      {/* Typography */}
      <Section
        title="Typography"
        subtitle="Clean, modern type hierarchy"
        icon={<Type className="w-6 h-6" />}
      >
        <div className="space-y-6">
          <div
            className="p-8 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <h1 className="mb-4">Heading 1 - The Quick Brown Fox</h1>
            <h2 className="mb-4">Heading 2 - The Quick Brown Fox</h2>
            <h3 className="mb-4">Heading 3 - The Quick Brown Fox</h3>
            <h4 className="mb-4">Heading 4 - The Quick Brown Fox</h4>
            <p className="mb-4">
              Body Text - The quick brown fox jumps over the lazy dog. This is regular paragraph text
              with proper line height and spacing for optimal readability.
            </p>
            <label className="block mb-2">Label Text - Form Input Label</label>
            <button>Button Text - Call to Action</button>
          </div>
        </div>
      </Section>

      {/* Buttons - Gestalt: Similarity */}
      <Section
        title="Buttons"
        subtitle="Multiple styles with neumorphic effects"
        icon={<Layout className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="p-6 rounded-3xl space-y-4"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <h4 className="mb-4">Primary</h4>
            <motion.button
              className="w-full px-6 py-4 rounded-2xl text-white flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
                boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5" />
              Primary Button
            </motion.button>
          </div>

          <div
            className="p-6 rounded-3xl space-y-4"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <h4 className="mb-4">Secondary</h4>
            <motion.button
              className="w-full px-6 py-4 rounded-2xl text-white"
              style={{
                background: 'linear-gradient(135deg, #89d4cf 0%, #a8e6cf 100%)',
                boxShadow: '0 8px 32px rgba(137, 212, 207, 0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Secondary Button
            </motion.button>
          </div>

          <div
            className="p-6 rounded-3xl space-y-4"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <h4 className="mb-4">Neumorphic</h4>
            <motion.button
              className="w-full px-6 py-4 rounded-2xl"
              style={{
                background: '#ffffff',
                boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Neumorphic Button
            </motion.button>
          </div>
        </div>
      </Section>

      {/* Cards */}
      <Section
        title="Cards"
        subtitle="Neumorphic card designs with soft shadows"
        icon={<Layout className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-8 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <h3 className="mb-4">Elevated Card</h3>
            <p className="text-muted-foreground">
              Standard card with neumorphic shadow effect. Perfect for content containers.
            </p>
          </div>

          <div
            className="p-8 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
              boxShadow: '0 20px 60px rgba(161, 140, 209, 0.3)',
            }}
          >
            <h3 className="mb-4 text-white">Gradient Card</h3>
            <p className="text-white/90">
              Gradient background with glow shadow. Used for featured content.
            </p>
          </div>

          <div
            className="p-8 rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
            }}
          >
            <h3 className="mb-4">Subtle Card</h3>
            <p className="text-muted-foreground">
              Soft gradient background for secondary content areas.
            </p>
          </div>

          <div
            className="p-8 rounded-3xl relative overflow-hidden"
            style={{
              background: '#ffffff',
              boxShadow: '20px 20px 60px rgba(163, 177, 198, 0.3), -20px -20px 60px rgba(255, 255, 255, 0.8)',
            }}
          >
            <h3 className="mb-4">Featured Card</h3>
            <p className="text-muted-foreground">
              Enhanced shadow for important highlighted content.
            </p>
          </div>
        </div>
      </Section>

      {/* Form Elements */}
      <Section
        title="Form Elements"
        subtitle="Input fields with focus states"
        icon={<Layout className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="p-6 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <label className="block mb-2">Standard Input</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-4 rounded-2xl border-0 outline-none"
              style={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.15)',
              }}
            />
          </div>

          <div
            className="p-6 rounded-3xl"
            style={{
              background: '#ffffff',
              boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
            }}
          >
            <label className="block mb-2">Range Slider</label>
            <input
              type="range"
              defaultValue={50}
              className="w-full h-3 rounded-full appearance-none cursor-pointer"
              style={{
                background: 'linear-gradient(to right, #a18cd1 0%, #a18cd1 50%, #e8eef5 50%, #e8eef5 100%)',
                boxShadow: 'inset 2px 2px 4px rgba(163, 177, 198, 0.2)',
              }}
            />
          </div>
        </div>
      </Section>

      {/* Spacing & Grid */}
      <Section
        title="Spacing System"
        subtitle="Consistent spacing using 4px base unit"
        icon={<Layout className="w-6 h-6" />}
      >
        <div
          className="p-8 rounded-3xl"
          style={{
            background: '#ffffff',
            boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
          }}
        >
          <div className="space-y-4">
            {[
              { size: '4px', class: 'w-1 h-8' },
              { size: '8px', class: 'w-2 h-8' },
              { size: '12px', class: 'w-3 h-8' },
              { size: '16px', class: 'w-4 h-8' },
              { size: '24px', class: 'w-6 h-8' },
              { size: '32px', class: 'w-8 h-8' },
              { size: '48px', class: 'w-12 h-8' },
              { size: '64px', class: 'w-16 h-8' },
            ].map((space) => (
              <div key={space.size} className="flex items-center gap-4">
                <div
                  className={`${space.class} rounded`}
                  style={{
                    background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
                  }}
                />
                <span className="text-sm text-muted-foreground">{space.size}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gestalt Principles */}
      <Section
        title="Gestalt Principles"
        subtitle="Design principles applied throughout"
        icon={<Sparkles className="w-6 h-6" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              principle: 'Proximity',
              description: 'Related elements are grouped together with consistent spacing',
            },
            {
              principle: 'Similarity',
              description: 'Similar elements share visual characteristics like color and shape',
            },
            {
              principle: 'Alignment',
              description: 'Elements are aligned on a 12-column grid for visual order',
            },
            {
              principle: 'Continuity',
              description: 'Smooth transitions and connected elements guide the eye',
            },
            {
              principle: 'Figure/Ground',
              description: 'Clear separation between content and background using shadows',
            },
            {
              principle: 'Common Region',
              description: 'Cards and containers group related information',
            },
          ].map((item, index) => (
            <motion.div
              key={item.principle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
              }}
            >
              <h4 className="mb-2">{item.principle}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
          style={{
            background: 'linear-gradient(135deg, #a18cd1 0%, #c9a9e9 100%)',
          }}
        >
          {icon}
        </div>
        <div>
          <h2 className="text-3xl">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function ColorCard({
  name,
  gradient,
  description,
}: {
  name: string;
  gradient: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl overflow-hidden"
      style={{
        boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
      }}
      whileHover={{ y: -8 }}
    >
      <div
        className="h-40"
        style={{
          background: gradient,
        }}
      />
      <div className="p-6 bg-white">
        <h4 className="mb-2">{name}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
