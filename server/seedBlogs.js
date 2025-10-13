
require('dotenv').config();
const mongoose = require('mongoose');
const Blog = require('./models/Blog');

const blogs = [
  {
    title: "AI Digital Marketing ROI: How Data-Driven Strategies Drive Growth",
    excerpt: "Discover how artificial intelligence is revolutionizing digital marketing campaigns and delivering unprecedented ROI for businesses across industries.",
    content: `<h2>Introduction</h2>
<p>Artificial Intelligence is transforming the landscape of digital marketing, enabling businesses to achieve unprecedented levels of personalization, efficiency, and ROI. In this comprehensive guide, we'll explore how AI-driven strategies are reshaping the marketing world.</p>

<h2>The Power of AI in Marketing</h2>
<p>AI algorithms can analyze vast amounts of customer data in real-time, identifying patterns and insights that would be impossible for humans to detect. This enables marketers to create highly targeted campaigns that resonate with specific audience segments.</p>

<h2>Key Benefits</h2>
<ul>
<li>Predictive analytics for customer behavior</li>
<li>Automated campaign optimization</li>
<li>Personalized content delivery</li>
<li>Real-time performance tracking</li>
</ul>

<h2>Implementation Strategies</h2>
<p>Successful AI integration requires a strategic approach. Start with clear objectives, ensure data quality, and choose the right AI tools for your specific needs. Monitor performance continuously and adjust your strategies based on insights.</p>

<h2>Conclusion</h2>
<p>AI-powered digital marketing is not just a trend—it's the future. Companies that embrace these technologies today will have a significant competitive advantage tomorrow.</p>`,
    date: "23 July 2025",
    readTime: "8 min read",
    category: "AI & Marketing",
    author: "Akshay Team",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    tags: ["AI", "Marketing", "ROI", "Data Analytics"],
    views: "2500",
    likes: "186",
    slug: "ai-digital-marketing-roi"
  },
  {
    title: "Cloud Hosting Sustainability: Building Eco-Friendly Infrastructure",
    excerpt: "Learn how modern cloud hosting solutions are becoming more environmentally sustainable while maintaining high performance and reliability.",
    content: `<h2>The Green Cloud Revolution</h2>
<p>As environmental concerns grow, cloud hosting providers are innovating to reduce their carbon footprint while delivering superior performance.</p>

<h2>Sustainable Practices</h2>
<p>Modern data centers are implementing renewable energy sources, efficient cooling systems, and optimized hardware utilization to minimize environmental impact.</p>

<h2>Benefits for Businesses</h2>
<ul>
<li>Reduced energy costs</li>
<li>Enhanced brand reputation</li>
<li>Compliance with environmental regulations</li>
<li>Long-term sustainability</li>
</ul>

<h2>Future Outlook</h2>
<p>The future of cloud hosting lies in carbon-neutral operations and innovative green technologies that balance performance with environmental responsibility.</p>`,
    date: "21 July 2025",
    readTime: "12 min read",
    category: "Cloud Technology",
    author: "Tech Expert",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    tags: ["Cloud", "Sustainability", "Infrastructure", "Green Tech"],
    views: "1800",
    likes: "142",
    slug: "cloud-hosting-sustainability"
  },
  {
    title: "AI for Account-Based Marketing: Personalization at Scale",
    excerpt: "Explore how AI-powered account-based marketing is transforming B2B sales strategies and creating personalized experiences for enterprise clients.",
    content: `<h2>Understanding AI-Powered ABM</h2>
<p>Account-based marketing combined with AI creates unprecedented opportunities for B2B companies to engage enterprise clients with highly personalized experiences.</p>

<h2>Key Components</h2>
<ul>
<li>Intelligent account identification</li>
<li>Predictive lead scoring</li>
<li>Automated content personalization</li>
<li>Multi-channel orchestration</li>
</ul>

<h2>Implementation Best Practices</h2>
<p>Success in AI-powered ABM requires alignment between sales and marketing, robust data infrastructure, and continuous optimization based on performance metrics.</p>`,
    date: "19 July 2025",
    readTime: "10 min read",
    category: "AI & Marketing",
    author: "Marketing Guru",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    tags: ["ABM", "AI", "B2B", "Personalization"],
    views: "3200",
    likes: "245",
    slug: "ai-account-based-marketing"
  },
  {
    title: "SAP Business One: Digital Transformation for SMEs",
    excerpt: "How small and medium enterprises are leveraging SAP Business One to streamline operations and compete with larger corporations.",
    content: `<h2>Empowering SMEs with SAP Business One</h2>
<p>SAP Business One provides small and medium enterprises with enterprise-grade ERP capabilities at an accessible scale.</p>

<h2>Core Features</h2>
<ul>
<li>Integrated financial management</li>
<li>Inventory and supply chain optimization</li>
<li>Customer relationship management</li>
<li>Business intelligence and reporting</li>
</ul>

<h2>Success Stories</h2>
<p>Numerous SMEs have transformed their operations using SAP Business One, achieving improved efficiency, reduced costs, and enhanced decision-making capabilities.</p>`,
    date: "17 July 2025",
    readTime: "9 min read",
    category: "SAP Solutions",
    author: "SAP Consultant",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop",
    tags: ["SAP", "ERP", "SME", "Digital Transformation"],
    views: "1900",
    likes: "128",
    slug: "sap-business-one-sme"
  },
  {
    title: "The Future of IT Staffing: Remote Work and Global Talent",
    excerpt: "Analyzing the evolution of IT staffing models in the post-pandemic world and how companies are accessing global talent pools.",
    content: `<h2>The Remote Work Revolution</h2>
<p>The shift to remote work has fundamentally changed how companies approach IT staffing, opening up global talent pools and new collaboration models.</p>

<h2>Benefits of Global Staffing</h2>
<ul>
<li>Access to diverse skill sets</li>
<li>Cost optimization</li>
<li>24/7 development capabilities</li>
<li>Cultural diversity and innovation</li>
</ul>

<h2>Best Practices</h2>
<p>Successful global staffing requires robust communication tools, clear processes, and a culture that embraces diversity and remote collaboration.</p>`,
    date: "15 July 2025",
    readTime: "7 min read",
    category: "IT Staffing",
    author: "HR Specialist",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    tags: ["Remote Work", "IT Staffing", "Global Talent", "Future of Work"],
    views: "2100",
    likes: "173",
    slug: "future-it-staffing-remote-work"
  },
  {
    title: "Implementing E-Invoicing: A Complete Guide for Businesses",
    excerpt: "Step-by-step guide to implementing e-invoicing systems, compliance requirements, and best practices for seamless digital invoice processing.",
    content: `<h2>E-Invoicing Fundamentals</h2>
<p>Electronic invoicing is transforming how businesses handle billing and payment processes, offering improved efficiency and compliance.</p>

<h2>Implementation Steps</h2>
<ol>
<li>Assess current invoicing processes</li>
<li>Choose the right e-invoicing solution</li>
<li>Ensure regulatory compliance</li>
<li>Train staff and stakeholders</li>
<li>Monitor and optimize</li>
</ol>

<h2>Compliance and Security</h2>
<p>E-invoicing systems must meet regulatory requirements while ensuring data security and privacy protection.</p>`,
    date: "13 July 2025",
    readTime: "11 min read",
    category: "Digital Solutions",
    author: "Finance Tech",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    tags: ["E-Invoicing", "Compliance", "Digital Finance", "Automation"],
    views: "1600",
    likes: "94",
    slug: "implementing-e-invoicing-guide"
  }
];

async function seedBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    await Blog.insertMany(blogs);
    console.log('Seeded blogs successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding blogs:', error);
    process.exit(1);
  }
}

seedBlogs();
