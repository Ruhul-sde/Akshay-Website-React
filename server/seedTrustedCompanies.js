
const mongoose = require('mongoose');
const TrustedCompanies = require('./models/TrustedCompanies');
require('dotenv').config();

const trustedCompaniesData = {
  title: "Trusted by Leading Companies",
  subtitle: "We partner with industry leaders to deliver exceptional solutions that drive digital transformation",
  companies: [
    { name: "SAP", logo: "https://logo.clearbit.com/sap.com", order: 1 },
    { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", order: 2 },
    { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com", order: 3 },
    { name: "IBM", logo: "https://logo.clearbit.com/ibm.com", order: 4 },
    { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", order: 5 },
    { name: "Google", logo: "https://logo.clearbit.com/google.com", order: 6 },
    { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com", order: 7 },
    { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com", order: 8 },
    { name: "Cisco", logo: "https://logo.clearbit.com/cisco.com", order: 9 },
    { name: "Intel", logo: "https://logo.clearbit.com/intel.com", order: 10 },
    { name: "Dell", logo: "https://logo.clearbit.com/dell.com", order: 11 },
    { name: "HP", logo: "https://logo.clearbit.com/hp.com", order: 12 },
    { name: "Accenture", logo: "https://logo.clearbit.com/accenture.com", order: 13 },
    { name: "Deloitte", logo: "https://logo.clearbit.com/deloitte.com", order: 14 },
    { name: "PwC", logo: "https://logo.clearbit.com/pwc.com", order: 15 },
    { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com", order: 16 },
    { name: "TCS", logo: "https://logo.clearbit.com/tcs.com", order: 17 },
    { name: "Wipro", logo: "https://logo.clearbit.com/wipro.com", order: 18 }
  ]
};

async function seedTrustedCompanies() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await TrustedCompanies.deleteMany({});
    console.log('🗑️  Cleared existing trusted companies data');

    // Insert new data
    const content = new TrustedCompanies(trustedCompaniesData);
    await content.save();
    console.log(`✅ Seeded trusted companies with ${trustedCompaniesData.companies.length} companies`);

    console.log('✅ Trusted companies seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding trusted companies:', error);
    process.exit(1);
  }
}

seedTrustedCompanies();
