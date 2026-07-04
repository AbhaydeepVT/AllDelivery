import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const statuses = [
  { label: 'Order Placed', time: '12:30 PM', done: true },
  { label: 'Preparing', time: '12:35 PM', done: true },
  { label: 'On the Way', time: '12:45 PM', done: true },
  { label: 'Delivered', time: '1:00 PM', done: false },
];

export default function Tracking() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white/30 backdrop-blur-md p-6 md:p-10 max-w-4xl mx-auto">
      <h1 className="text-5xl font-black mb-8">Tracking Order</h1>

      {/* Animated Map Area */}
      <div className="relative bg-glass-bg backdrop-blur-md rounded-3xl p-6 border border-glass-border shadow-xl mb-10 overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl relative">
          {/* Road SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
            <path d="M0,100 Q100,20 200,100 T400,100" fill="none" stroke="#94a3b8" strokeWidth="4" strokeDasharray="10,10" />
            {/* Delivery Bike */}
            <motion.g
              animate={{
                translateX: `${progress}%`,
                translateY: progress < 50 ? -20 : 10,
              }}
              transition={{ ease: 'linear' }}
            >
              <text fontSize="30" x="0" y="0">🛵</text>
            </motion.g>
          </svg>
        </div>
        <p className="text-center mt-4 text-gray-500 font-bold">
          Your delivery partner is on the way!
        </p>
      </div>

      {/* Driver Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-glass-bg backdrop-blur-md rounded-3xl p-6 border border-glass-border shadow-xl mb-10 flex items-center gap-4"
      >
        <img src="https://i.pravatar.cc/100" alt="Driver" className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h3 className="font-bold text-xl">Rahul Sharma</h3>
          <p className="text-gray-500">Bike • MH 12 AB 1234</p>
          <span className="text-yellow-500">⭐ 4.9</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="ml-auto bg-food-primary text-white px-6 py-3 rounded-full font-bold"
        >
          📞 Call
        </motion.button>
      </motion.div>

      {/* Live Timeline */}
      <div className="bg-glass-bg backdrop-blur-md rounded-3xl p-6 border border-glass-border shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Order Status</h2>
        <div className="space-y-6">
          {statuses.map((status, idx) => (
            <motion.div
              key={status.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="flex items-center gap-4"
            >
              <motion.div
                animate={{ scale: status.done ? 1.2 : 1 }}
                className={`w-4 h-4 rounded-full ${status.done ? 'bg-green-500' : 'bg-gray-300'}`}
              />
              <div className="flex-1">
                <p className={`font-bold ${status.done ? 'text-black' : 'text-gray-400'}`}>{status.label}</p>
                <p className="text-sm text-gray-500">{status.time}</p>
              </div>
              {status.done && <span className="text-green-500">✅</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}