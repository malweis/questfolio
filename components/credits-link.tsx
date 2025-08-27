"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CreditsLink() {
  return (
    <motion.footer 
      className="mt-16 mb-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <p className="text-white/60 mb-4 text-sm max-w-md mx-auto">
        This project uses assets from Creative Commons and other open source contributors.
      </p>
      <Link 
        href="/credits"
        className="text-amber-400 hover:text-amber-300 text-sm underline transition-colors"
      >
        View Credits & Attributions
      </Link>
    </motion.footer>
  );
}
