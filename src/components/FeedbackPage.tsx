import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { api } from '../lib/api';

export default function FeedbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams.get('product_id');

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!productId) {
      // Redirect or show message if no product selected
      // For now, let's just stay here but show a warning in the UI, or maybe redirect back to Home/Catalog
      // navigate('/'); 
    }
  }, [productId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    setIsSubmitting(true);
    try {
      await api.post('/feedback', {
        product_id: parseInt(productId),
        rating,
        comment
      });
      alert('Feedback submitted successfully!');
      navigate('/'); // Or back to product page
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!productId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl mb-4">No product specified</h2>
        <p className="mb-4">Please select a product from your orders or catalog to review.</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-violet-600 text-white rounded-xl">
          Go to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <motion.div
        className="p-8 rounded-3xl mb-8 text-center"
        style={{
          background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
          boxShadow: '0 8px 32px rgba(255, 168, 181, 0.3)',
          color: 'white',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Sparkles className="w-10 h-10 mx-auto mb-4" />
        <h1 className="text-4xl mb-2">Product Feedback</h1>
        <p className="text-lg mb-4">Rate product #{productId}</p>
      </motion.div>
      <motion.form
        onSubmit={handleSubmit}
        className="p-8 rounded-3xl bg-white"
        style={{
          boxShadow: '10px 10px 20px rgba(163, 177, 198, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.8)',
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="space-y-6">
          <div className="flex gap-2 mb-4 justify-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-8 h-8 cursor-pointer transition-colors ${i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                onClick={() => setRating(i)}
              />
            ))}
          </div>
          <textarea
            className="w-full px-4 py-4 rounded-2xl outline-none mb-4 transition-all shadow-sm bg-white"
            style={{
              border: '2px solid rgb(201, 198, 198)', // violet-300
              boxShadow: '0 2px 8px rgba(167, 139, 250, 0.08)',
            }}
            placeholder="Your feedback..."
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl text-white disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgb(88, 35, 212) 0%, #c9a9e9 100%)',
              boxShadow: '0 8px 32px rgba(255, 168, 181, 0.4)',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}