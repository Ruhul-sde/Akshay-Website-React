
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';

export default function Blog() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "AI Digital Marketing ROI: How Data-Driven Strategies Drive Growth",
      excerpt: "Discover how artificial intelligence is revolutionizing digital marketing campaigns and delivering unprecedented ROI for businesses across industries.",
      date: "23 July 2025",
      readTime: "8 min read",
      category: "AI & Marketing",
      author: "Akshay Team",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      tags: ["AI", "Marketing", "ROI", "Data Analytics"],
      views: "2.5k",
      likes: "186"
    },
    {
      id: 2,
      title: "Cloud Hosting Sustainability: Building Eco-Friendly Infrastructure",
      excerpt: "Learn how modern cloud hosting solutions are becoming more environmentally sustainable while maintaining high performance and reliability.",
      date: "21 July 2025",
      readTime: "12 min read",
      category: "Cloud Technology",
      author: "Tech Expert",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      tags: ["Cloud", "Sustainability", "Infrastructure", "Green Tech"],
      views: "1.8k",
      likes: "142"
    },
    {
      id: 3,
      title: "AI for Account-Based Marketing: Personalization at Scale",
      excerpt: "Explore how AI-powered account-based marketing is transforming B2B sales strategies and creating personalized experiences for enterprise clients.",
      date: "19 July 2025",
      readTime: "10 min read",
      category: "AI & Marketing",
      author: "Marketing Guru",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      tags: ["ABM", "AI", "B2B", "Personalization"],
      views: "3.2k",
      likes: "245"
    },
    {
      id: 4,
      title: "SAP Business One: Digital Transformation for SMEs",
      excerpt: "How small and medium enterprises are leveraging SAP Business One to streamline operations and compete with larger corporations.",
      date: "17 July 2025",
      readTime: "9 min read",
      category: "SAP Solutions",
      author: "SAP Consultant",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
      tags: ["SAP", "ERP", "SME", "Digital Transformation"],
      views: "1.9k",
      likes: "128"
    },
    {
      id: 5,
      title: "The Future of IT Staffing: Remote Work and Global Talent",
      excerpt: "Analyzing the evolution of IT staffing models in the post-pandemic world and how companies are accessing global talent pools.",
      date: "15 July 2025",
      readTime: "7 min read",
      category: "IT Staffing",
      author: "HR Specialist",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      tags: ["Remote Work", "IT Staffing", "Global Talent", "Future of Work"],
      views: "2.1k",
      likes: "173"
    },
    {
      id: 6,
      title: "Implementing E-Invoicing: A Complete Guide for Businesses",
      excerpt: "Step-by-step guide to implementing e-invoicing systems, compliance requirements, and best practices for seamless digital invoice processing.",
      date: "13 July 2025",
      readTime: "11 min read",
      category: "Digital Solutions",
      author: "Finance Tech",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      tags: ["E-Invoicing", "Compliance", "Digital Finance", "Automation"],
      views: "1.6k",
      likes: "94"
    }
  ];

  const categories = ['All', 'AI & Marketing', 'Cloud Technology', 'SAP Solutions', 'IT Staffing', 'Digital Solutions'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-red-500 via-purple-600 to-blue-600 text-white overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px, 0) rotateX(${mousePosition.y * 0.1}deg)`
            }}
          />
          <div 
            className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-2xl blur-2xl animate-bounce"
            style={{
              transform: `translate3d(${mousePosition.x * -0.3}px, ${mousePosition.y * 0.5}px, 0) rotateY(${mousePosition.x * 0.1}deg)`,
              animationDelay: '1s'
            }}
          />
          
          {/* Floating Icons */}
          <div className="absolute top-1/3 left-10 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-white/15 rounded-lg flex items-center justify-center animate-pulse">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
              <span className="text-sm font-medium">TECH INSIGHTS & UPDATES</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Blog</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Insights, tutorials, and industry expertise to help you stay ahead in the digital transformation journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-red-100 to-purple-100 rounded-full blur-2xl"
            style={{
              transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.1}px, 0)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.2}px, 0)`
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
            </h2>
            <p className="text-gray-600 text-lg">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>

          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or selected category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse"
            style={{
              transform: `translate3d(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.2}px, 0)`
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl opacity-90 mb-8">
              Subscribe to our newsletter and never miss out on the latest insights and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
