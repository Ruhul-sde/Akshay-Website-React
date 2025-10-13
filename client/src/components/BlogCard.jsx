
import React from 'react';
import { motion } from 'framer-motion';

export default function BlogCard({ blog, index, onClick }) {
  const [views, setViews] = React.useState(blog.views);
  const [likes, setLikes] = React.useState(blog.likes);

  React.useEffect(() => {
    setViews(blog.views);
    setLikes(blog.likes);
  }, [blog.views, blog.likes]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-transparent cursor-pointer"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-red-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500 z-10 pointer-events-none"></div>
      
      {/* Image Container with Parallax Effect */}
      <div className="relative overflow-hidden h-64">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Category Badge - Floating */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6"
        >
          <span className="inline-flex items-center bg-white/95 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-white/20">
            <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-purple-500 rounded-full mr-2 animate-pulse"></span>
            {blog.category}
          </span>
        </motion.div>

        {/* Date Badge - Floating */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-6 right-6"
        >
          <div className="bg-gradient-to-br from-red-600 to-purple-600 rounded-2xl px-4 py-2 shadow-xl">
            <div className="text-xs text-white/90 font-medium">{blog.date}</div>
          </div>
        </motion.div>

        {/* Stats Badge - Bottom */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-3">
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs font-medium">{views}</span>
          </div>
          <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-white">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs font-medium">{likes}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 relative z-20">
        {/* Author Info with Avatar */}
        <div className="flex items-center mb-5">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
              <span className="text-white font-bold text-lg">{blog.author.charAt(0)}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-bold text-gray-900">{blog.author}</div>
            <div className="text-xs text-gray-500 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {blog.readTime}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-purple-600 transition-all duration-300 line-clamp-2 leading-tight">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * tagIndex }}
              className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 text-xs font-medium rounded-lg hover:from-red-50 hover:to-purple-50 hover:text-red-600 transition-all duration-200 border border-gray-200"
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        {/* Read More CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center group/btn text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 font-bold text-sm">
            <span className="mr-2">Read Full Story</span>
            <motion.svg 
              className="w-5 h-5 text-red-600"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </div>
          
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-purple-500/10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
    </motion.article>
  );
}
