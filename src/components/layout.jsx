// Layout.js
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import "../styles/main.css";

import Header from './header'
import Footer from './footer'

const Layout = () => {
  return (
    <motion.div layout >
      <Header />
      <div>
        <Outlet /> {/* Content specific to the route will be rendered here */}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Layout;
