
require("dotenv").config();
const mongoose = require("mongoose");
const Navigation = require("./models/Navigation");

const navigationData = [
  {
    label: 'Home',
    href: '/',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    hasDropdown: false,
    isRoute: true,
    order: 1
  },
  {
    label: 'SAP',
    href: '#',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    hasDropdown: true,
    isRoute: false,
    dropdown: [
      { label: 'SAP Business One Solution', href: '/sap-business-one', order: 1 },
      { label: 'SAP Business One Implementation Partner', href: '/sap-implementation', order: 2 },
      { label: 'SAP Business One Support', href: '/sap-support', order: 3 },
      { label: 'SAP B1 Add Ons', href: '/sap-addons', order: 4 },
      { label: 'SAP S/4HANA', href: '/sap-s4hana', order: 5 },
      { label: 'Grow with SAP', href: '/grow-with-sap', order: 6 },
      { label: 'Rise with SAP', href: '/rise-with-sap', order: 7 },
      { label: 'E-Invoicing', href: '/e-invoicing', order: 8 },
      { label: 'SAP Case Studies', href: '/sap-case-studies', order: 9 }
    ],
    order: 2
  },
  {
    label: 'Staffing',
    href: '#',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    hasDropdown: true,
    isRoute: false,
    dropdown: [
      { label: 'IT Staffing', href: '/it-staffing', order: 1 },
      { label: 'Payroll Management', href: '/payroll-management', order: 2 }
    ],
    order: 3
  },
  {
    label: 'Cloud',
    href: '#',
    icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
    hasDropdown: true,
    isRoute: false,
    dropdown: [
      { label: 'Cloud Hosting', href: '/cloud-hosting', order: 1 }
    ],
    order: 4
  },
  {
    label: 'AI',
    href: '#',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    hasDropdown: true,
    isRoute: false,
    dropdown: [
      { label: 'Akshay Intelligence', href: '/akshay-intelligence', order: 1 },
      { label: 'AI – Digital Marketing', href: '/ai-digital-marketing', order: 2 },
      { label: 'AI Inside Sales', href: '/ai-inside-sales', order: 3 }
    ],
    order: 5
  },
  {
    label: 'ERP',
    href: '#',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    hasDropdown: true,
    isRoute: false,
    dropdown: [
      { label: 'Crest ERP', href: '/crest-erp', order: 1 },
      { label: 'Case Studies', href: '/erp-case-studies', order: 2 }
    ],
    order: 6
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    hasDropdown: false,
    isRoute: true,
    order: 7
  },
  {
    label: 'About',
    href: '/about',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    hasDropdown: false,
    isRoute: true,
    order: 8
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    hasDropdown: false,
    isRoute: true,
    order: 9
  },
  {
    label: 'Support',
    href: '/support',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
    hasDropdown: false,
    isRoute: true,
    order: 10
  }
];

async function seedNavigation() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/support_ticketing_system');
    console.log('Connected to MongoDB');

    // Clear existing navigation
    await Navigation.deleteMany({});
    console.log('Cleared existing navigation');

    // Insert new navigation
    await Navigation.insertMany(navigationData);
    console.log('Navigation seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding navigation:', error);
    process.exit(1);
  }
}

seedNavigation();
