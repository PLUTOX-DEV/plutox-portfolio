// components/Layout.js
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto bg-black text-white">
        <Navbar />
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
