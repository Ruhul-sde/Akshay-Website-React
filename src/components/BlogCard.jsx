
import React from 'react';
import { motion } from 'framer-motion';

export default function BlogCard({ blog, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            {blog.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <div className="text-xs text-gray-600 font-medium">{blog.date}</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{blog.author.charAt(0)}</span>
          </div>
          <div className="ml-3">
            <div className="text-sm font-medium text-gray-900">{blog.author}</div>
            <div className="text-xs text-gray-500">{blog.readTime}</div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <div className="flex items-center justify-between">
          <button className="group/btn flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-200">
            Read More
            <svg 
              className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>

          <div className="flex items-center space-x-4 text-gray-400">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-sm">{blog.views}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm">{blog.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
