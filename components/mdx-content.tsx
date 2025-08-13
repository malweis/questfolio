"use client";

import { MDXProvider } from '@mdx-js/react';
import { motion } from 'framer-motion';

const components = {
  h1: (props: any) => (
    <motion.h1 
      id="character-title"
      className="text-4xl font-bold text-white mb-6 border-b border-purple-400/30 pb-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <motion.h2 
      id={props.children?.toLowerCase().replace(/\s+/g, '-')}
      className="text-3xl font-semibold text-white mt-12 mb-6 text-purple-300"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    />
  ),
  h3: (props: any) => (
    <motion.h3 
      className="text-2xl font-medium text-white mt-8 mb-4 text-purple-200"
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      {...props}
    />
  ),
  p: (props: any) => (
    <motion.p 
      className="text-lg text-white/90 leading-relaxed mb-6"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      {...props}
    />
  ),
  ul: (props: any) => (
    <motion.ul 
      className="list-disc list-inside text-lg text-white/90 mb-6 space-y-2 ml-4"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      {...props}
    />
  ),
  ol: (props: any) => (
    <motion.ol 
      className="list-disc list-inside text-lg text-white/90 mb-6 space-y-2 ml-4"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      {...props}
    />
  ),
  li: (props: any) => (
    <li className="text-white/90" {...props} />
  ),
  blockquote: (props: any) => (
    <motion.blockquote 
      className="border-l-4 border-purple-400 pl-6 py-4 my-8 bg-purple-900/20 rounded-r-lg"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong className="text-purple-300 font-semibold" {...props} />
  ),
  em: (props: any) => (
    <em className="text-purple-200 italic" {...props} />
  ),
  hr: () => (
    <motion.hr 
      className="border-t border-purple-400/30 my-12"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    />
  ),
  code: (props: any) => (
    <code className="bg-purple-900/30 text-purple-200 px-2 py-1 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-purple-900/30 text-purple-200 p-4 rounded-lg overflow-x-auto my-6" {...props} />
  ),
};

interface MDXContentProps {
  children: React.ReactNode;
}

export default function MDXContent({ children }: MDXContentProps) {
  return (
    <MDXProvider components={components}>
      <div className="prose prose-invert max-w-none">
        {children}
      </div>
    </MDXProvider>
  );
}
