import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

// SAP Pages
import SapBusinessOne from './pages/SapBusinessOne';
import SapImplementation from './pages/SapImplementation';
import SapSupport from './pages/SapSupport';
import SapAddOns from './pages/SapAddOns';
import SapS4Hana from './pages/SapS4Hana';
import GrowWithSap from './pages/GrowWithSap';
import RiseWithSap from './pages/RiseWithSap';
import EInvoicing from './pages/EInvoicing';
import SapCaseStudies from './pages/SapCaseStudies';

// Staffing Pages
import ItStaffing from './pages/ItStaffing';
import PayrollManagement from './pages/PayrollManagement';

// Cloud Pages
import CloudHosting from './pages/CloudHosting';

// AI Pages
import AkshayIntelligence from './pages/AkshayIntelligence';
import AiDigitalMarketing from './pages/AiDigitalMarketing';
import AiInsideSales from './pages/AiInsideSales';

// ERP Pages
import CrestErp from './pages/CrestErp';
import ErpCaseStudies from './pages/ErpCaseStudies';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
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

          {/* Blog Route */}
          <Route path="/blog" element={<Blog />} />

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