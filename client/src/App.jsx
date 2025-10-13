import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

// SAP Pages
import SapBusinessOne from './pages/sap/SapBusinessOne';
import SapImplementation from './pages/sap/SapImplementation';
import SapSupport from './pages/sap/SapSupport';
import SapAddOns from './pages/sap/SapAddOns';
import SapS4Hana from './pages/sap/SapS4Hana';
import GrowWithSap from './pages/sap/GrowWithSap';
import RiseWithSap from './pages/sap/RiseWithSap';
import EInvoicing from './pages/sap/EInvoicing';
import SapCaseStudies from './pages/sap/SapCaseStudies';

// Staffing Pages
import ItStaffing from './pages/Staffing/ItStaffing';
import PayrollManagement from './pages/Staffing/PayrollManagement';

// Cloud Pages
import CloudHosting from './pages/CloudHosting';

// AI Pages
import AkshayIntelligence from './pages/Artificial Intelligence/AkshayIntelligence';
import AiDigitalMarketing from './pages/Artificial Intelligence/AiDigitalMarketing';
import AiInsideSales from './pages/Artificial Intelligence/AiInsideSales';

// ERP Pages
import CrestErp from './pages/ERP/CrestErp';
import ErpCaseStudies from './pages/ERP/ErpCaseStudies';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail'; // Assuming BlogDetail component exists
import Support from './pages/Support';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* SAP Routes */}
          <Route path="/sap-business-one" element={<SapBusinessOne />} />
          <Route path="/sap-implementation" element={<SapImplementation />} />
          <Route path="/sap-support" element={<SapSupport />} />
          <Route path="/sap-addons" element={<SapAddOns />} />
          <Route path="/sap-s4hana" element={<SapS4Hana />} />
          <Route path="/grow-with-sap" element={<GrowWithSap />} />
          <Route path="/rise-with-sap" element={<RiseWithSap />} />
          <Route path="/e-invoicing" element={<EInvoicing />} />
          <Route path="/sap-case-studies" element={<SapCaseStudies />} />

          {/* Staffing Routes */}
          <Route path="/it-staffing" element={<ItStaffing />} />
          <Route path="/payroll-management" element={<PayrollManagement />} />

          {/* Cloud Routes */}
          <Route path="/cloud-hosting" element={<CloudHosting />} />

          {/* AI Routes */}
          <Route path="/akshay-intelligence" element={<AkshayIntelligence />} />
          <Route path="/ai-digital-marketing" element={<AiDigitalMarketing />} />
          <Route path="/ai-inside-sales" element={<AiInsideSales />} />

          {/* ERP Routes */}
          <Route path="/crest-erp" element={<CrestErp />} />
          <Route path="/erp-case-studies" element={<ErpCaseStudies />} />

          {/* Contact Route */}
          <Route path="/contact" element={<ContactUs />} />

          {/* About Route */}
          <Route path="/about" element={<AboutUs />} />

          {/* Blog Routes */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Support Routes */}
          <Route path="/support" element={<Support />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;