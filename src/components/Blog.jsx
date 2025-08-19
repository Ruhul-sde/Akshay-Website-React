
export default function Blog() {
  const blogPosts = [
    {
      title: "Building Scalable React Applications",
      excerpt: "Learn best practices for structuring and scaling React applications for enterprise-level projects.",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop"
    },
    {
      title: "Microservices Architecture Patterns",
      excerpt: "A comprehensive guide to implementing microservices architecture with Node.js and Docker.",
      date: "March 10, 2024",
      readTime: "12 min read",
      category: "Architecture",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop"
    },
    {
      title: "Database Optimization Techniques",
      excerpt: "Practical tips for optimizing database performance and scaling your data layer effectively.",
      date: "March 5, 2024",
      readTime: "10 min read",
      category: "Database",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">Blog</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thoughts, insights, and tutorials on software development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
                
                <div className="flex items-center text-primary font-medium group-hover:text-blue-600 transition-colors duration-200">
                  Read More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center bg-primary text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            View All Posts
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
