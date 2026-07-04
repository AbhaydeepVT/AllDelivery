import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const sections = {
    About: 'delivery.ai is a futuristic delivery experience blending food & grocery in one premium platform. We aim to redefine convenience with Apple-like design.',
    Privacy: 'We take your privacy seriously. All personal data is encrypted and never shared without consent. Read our full privacy policy for details.',
    Terms: 'By using delivery.ai you agree to our terms of service. Orders are subject to availability and delivery fees may apply.',
    Contact: 'Reach us at hello@delivery.ai or call +91 98765 43210. Our support team is available 24/7.',
  };

  return (
    <footer className="bg-glass-bg backdrop-blur-md border-t border-glass-border py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(sections).map(([title, content]) => (
          <div key={title}>
            <button
              onClick={() => setOpenSection(openSection === title ? null : title)}
              className="text-sm font-bold text-gray-700 hover:text-food-primary transition w-full text-left"
            >
              {title}
            </button>
            <AnimatePresence>
              {openSection === title && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-xs text-gray-500 mt-2 overflow-hidden"
                >
                  {content}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mt-6">© 2026 delivery.ai — The Apple of Delivery Apps</p>
    </footer>
  );
}