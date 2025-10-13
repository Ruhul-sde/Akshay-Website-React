
const mongoose = require('mongoose');
const CompanyKnowledge = require('./models/CompanyKnowledge');
require('dotenv').config();

const knowledgeData = [
  // Company Information
  {
    category: 'company_info',
    question: 'What is Akshay Software Technologies?',
    answer: 'Akshay Software Technologies, established in 1987, is headquartered in Mumbai, India, with global presence including offices in Dubai, UAE and partnerships across Europe, Middle East, and Asia. We have 37+ years of experience in IT services.',
    keywords: ['akshay', 'company', 'about', 'founded', 'established', 'headquarters', 'mumbai', 'dubai', 'global']
  },
  {
    category: 'company_info',
    question: 'When was Akshay Software Technologies founded?',
    answer: 'Akshay Software Technologies was established in 1987, bringing over 37 years of experience in IT services and solutions.',
    keywords: ['founded', 'established', 'year', 'when', '1987', 'history']
  },
  {
    category: 'company_info',
    question: 'Where is Akshay Software Technologies located?',
    answer: 'We are headquartered in Mumbai, India, with offices in Dubai, UAE, and partnerships across Europe, Middle East, and Asia.',
    keywords: ['location', 'office', 'address', 'where', 'mumbai', 'dubai', 'india', 'uae']
  },
  
  // Services
  {
    category: 'services',
    question: 'What services does Akshay Software Technologies provide?',
    answer: 'We provide SAP ERP Solutions (SAP Business One, SAP S/4HANA, custom add-ons), IT Staffing & Recruitment, Payroll Outsourcing, and CRM Development. We specialize in SAP Business One for SMEs and SAP S/4HANA implementation using AI and IoT.',
    keywords: ['services', 'sap', 'erp', 'staffing', 'payroll', 'crm', 'solutions', 'business one', 's/4hana']
  },
  {
    category: 'services',
    question: 'Tell me about SAP Business One services',
    answer: 'We specialize in SAP Business One for small and medium enterprises (SMEs), enabling growth and automation. Our solutions are tailored to help businesses streamline operations and improve efficiency.',
    keywords: ['sap', 'business one', 'sme', 'erp', 'automation', 'small business']
  },
  {
    category: 'services',
    question: 'What is SAP S/4HANA implementation?',
    answer: 'We provide SAP S/4HANA implementation services that deliver real-time insights using AI and IoT technologies. This modernizes your ERP system for better decision-making and operational efficiency.',
    keywords: ['s/4hana', 'sap', 'implementation', 'ai', 'iot', 'real-time', 'erp']
  },
  {
    category: 'services',
    question: 'What IT staffing services do you offer?',
    answer: 'We have over 200 man-years of experience in IT recruitment across India and UAE. We are a trusted staffing vendor since 2010, providing quality IT professionals to leading organizations.',
    keywords: ['staffing', 'recruitment', 'it staffing', 'hiring', 'manpower', 'resources']
  },
  {
    category: 'services',
    question: 'Do you provide payroll services?',
    answer: 'Yes, we offer comprehensive and cost-effective payroll outsourcing services with seamless processes to manage your payroll needs efficiently.',
    keywords: ['payroll', 'outsourcing', 'payroll management', 'hr services']
  },
  {
    category: 'services',
    question: 'What CRM solutions do you offer?',
    answer: 'We develop proprietary CRM software to enhance customer relationship management and improve customer satisfaction for businesses.',
    keywords: ['crm', 'customer relationship', 'software', 'development', 'custom crm']
  },
  
  // Industries
  {
    category: 'industries',
    question: 'Which industries do you serve?',
    answer: 'We serve multiple industries globally including Banking, Retail, Manufacturing, Engineering, and many other sectors with our advanced ERP and IT solutions.',
    keywords: ['industries', 'sectors', 'banking', 'retail', 'manufacturing', 'engineering']
  },
  
  // Clients & Testimonials
  {
    category: 'testimonials',
    question: 'Who are your major clients?',
    answer: 'We work with prominent organizations including Tata Group, NSEIT, J. Kumar, HDFC, Stockholding, and many other leading companies. Many of our client relationships span over 10 years.',
    keywords: ['clients', 'customers', 'tata', 'hdfc', 'nseit', 'portfolio']
  },
  {
    category: 'testimonials',
    question: 'What do clients say about Akshay Software Technologies?',
    answer: 'HDFC has recognized us as their preferred IT manpower vendor since 2010. Our employees appreciate the exceptional support and career opportunities we provide. We are known for long-term client relationships spanning over a decade.',
    keywords: ['testimonials', 'reviews', 'client feedback', 'hdfc', 'trust']
  },
  
  // Leadership
  {
    category: 'leadership',
    question: 'Who leads Akshay Software Technologies?',
    answer: 'Our company is led by Chairman Mr. Anantapadmanabhan C.V. and Managing Director Ms. Nethraa Ganesan, bringing decades of industry expertise and vision.',
    keywords: ['leadership', 'chairman', 'managing director', 'ceo', 'management', 'anantapadmanabhan', 'nethraa']
  },
  
  // Mission & Vision
  {
    category: 'company_info',
    question: 'What is your mission and vision?',
    answer: 'Our Mission: Deliver efficient ERP software and staffing solutions, nurture human capital, and foster improvement and trust. Our Vision: To become a top player in our business lines by leveraging technology and empowering employees, clients, and communities.',
    keywords: ['mission', 'vision', 'goals', 'values', 'purpose']
  },
  
  // Achievements
  {
    category: 'achievements',
    question: 'What are your key achievements?',
    answer: 'Our key achievements include: tailored SAP solutions for SMEs, long-standing client relationships spanning over 10 years, and being a trusted staffing vendor since 2010. We have 37+ years of experience delivering quality solutions on time.',
    keywords: ['achievements', 'awards', 'success', 'milestones', 'experience']
  },
  
  // Contact Information
  {
    category: 'contact',
    question: 'How can I contact Akshay Software Technologies?',
    answer: 'You can reach us at:\nWebsite: www.akshay.com\nEmail: info@akshay.com\nPhone: +91-22-6712 6060\nWe are also active on Facebook, Instagram, X (Twitter), and LinkedIn.',
    keywords: ['contact', 'email', 'phone', 'website', 'reach', 'connect', 'social media']
  },
  {
    category: 'contact',
    question: 'What is your email address?',
    answer: 'You can email us at info@akshay.com for any inquiries.',
    keywords: ['email', 'contact', 'mail']
  },
  {
    category: 'contact',
    question: 'What is your phone number?',
    answer: 'You can call us at +91-22-6712 6060.',
    keywords: ['phone', 'call', 'telephone', 'number']
  },
  
  // Technology
  {
    category: 'services',
    question: 'What technologies do you use?',
    answer: 'We leverage advanced technologies including AI (Artificial Intelligence), ML (Machine Learning), and IoT (Internet of Things) to modernize ERP systems and deliver cutting-edge solutions.',
    keywords: ['technology', 'ai', 'ml', 'iot', 'artificial intelligence', 'machine learning']
  }
];

async function seedKnowledge() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing knowledge
    await CompanyKnowledge.deleteMany({});
    console.log('🗑️  Cleared existing knowledge base');

    // Insert new knowledge
    await CompanyKnowledge.insertMany(knowledgeData);
    console.log(`✅ Seeded ${knowledgeData.length} knowledge entries`);

    console.log('✅ Knowledge base seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding knowledge:', error);
    process.exit(1);
  }
}

seedKnowledge();
