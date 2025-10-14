
const express = require("express");
const AboutUs = require("../models/AboutUs");
const router = express.Router();

// Get About Us content
router.get("/", async (req, res) => {
  try {
    let content = await AboutUs.findOne();
    
    if (!content) {
      // Create default content if none exists
      content = new AboutUs({
        hero: {
          title: "About Us",
          subtitle: "Empowering businesses with Innovation & Excellence for over 38 years"
        },
        vision: {
          title: "VISION",
          description: "To be a top player in every line of business that we are in. To be technologically ahead always. To empower employees, clients and community."
        },
        mission: {
          title: "MISSION",
          description: "Our Mission",
          points: [
            "Provide efficient ERP Software Solutions, Staffing Solutions, and AI-driven Sales and Digital Marketing Solutions.",
            "Enable organizations to focus on their core activities using the latest technology.",
            "Nurture human capital to deliver quality services on time.",
            "Foster continuous improvement and innovation."
          ]
        },
        coreValues: [
          { title: "Customer Care", description: "Our customers' satisfaction is our success.", color: "from-red-500 to-red-600" },
          { title: "People Care", description: "We value our employees as our greatest asset.", color: "from-blue-500 to-blue-600" },
          { title: "Quality Care", description: "Excellence is our standard.", color: "from-green-500 to-green-600" },
          { title: "Investor Care", description: "We build long-term relationships based on trust.", color: "from-purple-500 to-purple-600" }
        ],
        stats: [
          { number: "150+", label: "EMPLOYEES" },
          { number: "50+", label: "CLIENTS" },
          { number: "26+", label: "EXPERT CONSULTANTS" },
          { number: "100%", label: "HAPPY CLIENTS" }
        ],
        aboutCompany: {
          title: "Empowering businesses with Innovation & Excellence for over 38 years",
          description: "Founded in June 1987 by seasoned technocrats, Akshay Software Technologies Private Limited is an IT services company with offices in India and the UAE. Their offerings include SAP Business One ERP for SMEs, staffing solutions, and a team of certified consultants with extensive project experience across domains."
        },
        digitalTransformation: {
          title: "Driving Digital Transformation using Modern Technology",
          description: "Under the new young leadership, Akshay has new initiatives as offerings – Cloud Hosting and Computing Services, AI (Akshay Intelligence), Digital marketing Agency, AI Inside Sales.",
          features: [
            "Cloud Hosting & Computing",
            "Akshay Intelligence (AI)",
            "Digital Marketing",
            "AI Inside Sales"
          ]
        },
        boardMembers: [
          {
            name: "Mr. Anant C. V.",
            role: "CHAIRMAN",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
            description: "Anant is responsible for the overall management and supervision of the activities.",
            order: 1
          },
          {
            name: "Ms. Nethraa Ganesan",
            role: "MANAGING DIRECTOR",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
            description: "With over two decades of dynamic leadership experience with a MBA degree, Nethraa...",
            order: 2
          },
          {
            name: "Mr. Akshay Anantapadmanabhan",
            role: "DIRECTOR",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            description: "Akshay Anantapadmanabhan has been instrumental in driving the company forward...",
            order: 3
          }
        ],
        leadershipTeam: [
          {
            name: "Mr. Rajan Chelladurai",
            role: "GLOBAL HEAD - ERP",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
            description: "With over 30 years of rich industry experience, Rajan Chelladurai serves as the Global Head - ERP at Akshay Software Technologies Private Limited.",
            order: 1
          },
          {
            name: "Mrs. Bhavana Thapa",
            role: "TALENT ACQUISITION - HR MANAGER",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
            description: "Bhavana leads Akshay's staffing and HR initiatives with a strong focus on sourcing the right talent and ensuring seamless client coordination.",
            order: 2
          }
        ],
        services: [
          { title: "SAP Business One", description: "Scalable ERP solution streamlining business operations, finance, and inventory management.", icon: "💼", order: 1 },
          { title: "SAP Support", description: "Expert assistance ensuring smooth SAP system performance, upgrades, and troubleshooting.", icon: "🛠️", order: 2 },
          { title: "IT Staffing", description: "Providing skilled tech talent for projects, contracts, and full-time roles.", icon: "👥", order: 3 },
          { title: "Digital Marketing", description: "Driving online growth through SEO, PPC, content and social media.", icon: "📱", order: 4 },
          { title: "AI Inside Sales", description: "AI-powered lead generation, prospect engagement, and sales automation for businesses.", icon: "🤖", order: 5 },
          { title: "Cloud Hosting & Computing", description: "Secure, scalable cloud infrastructure ensuring seamless data storage and processing.", icon: "☁️", order: 6 }
        ]
      });
      await content.save();
    }
    
    res.json({ success: true, data: content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// Update About Us content (admin only - add auth middleware as needed)
router.put("/", async (req, res) => {
  try {
    const content = await AboutUs.findOneAndUpdate(
      {},
      { ...req.body, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    
    res.json({ success: true, data: content });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Failed to update content" });
  }
});

module.exports = router;
