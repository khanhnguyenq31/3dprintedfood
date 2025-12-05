import { motion } from 'motion/react';
import { Mail, Phone, Printer } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <motion.div
        className="p-8 rounded-3xl mb-8 text-center"
        style={{
          background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
          boxShadow: '0 8px 32px rgba(161, 140, 209, 0.25)',
          color: 'white',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Printer className="w-10 h-10 mx-auto mb-4" />
        <h1 className="text-4xl mb-2">Contact Us</h1>
        <p className="text-lg mb-4">We're here to help! Reach out to our team anytime.</p>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            <span>support@printfood.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </motion.div>
      <motion.form
        className="p-8 rounded-3xl bg-white"
        style={{
          boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="space-y-6">
          <input className="w-full px-4 py-4 rounded-2xl outline-none mb-4 transition-all shadow-sm bg-white" 
          style={{
    border: '2px solid rgb(201, 198, 198)', // violet-300
    boxShadow: '0 2px 8px rgba(167, 139, 250, 0.08)',
  }}
          placeholder="Your Name" />
          <input className="w-full px-4 py-4 rounded-2xl outline-none mb-4 transition-all shadow-sm bg-white" 
          style={{
    border: '2px solid rgb(201, 198, 198)', // violet-300
    boxShadow: '0 2px 8px rgba(167, 139, 250, 0.08)',
  }}
          placeholder="Your Email" />
          <textarea className="w-full px-4 py-4 rounded-2xl outline-none mb-4 transition-all shadow-sm bg-white" 
          style={{
    border: '2px solid rgb(201, 198, 198)', // violet-300
    boxShadow: '0 2px 8px rgba(167, 139, 250, 0.08)',
  }}
          placeholder="Message" rows={4} />
          <motion.button
            type="submit"
            className="w-full py-4 rounded-2xl text-white"
            style={{
              background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
              boxShadow: '0 8px 32px rgba(161, 140, 209, 0.4)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}