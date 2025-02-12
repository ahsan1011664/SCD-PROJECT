import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FileText, Trash2, LogOut, Star, Menu } from 'lucide-react';
import logo2 from "../images/logo2.png";
import logo3 from "../images/logo3.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
    window.location.reload();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { icon: FileText, name: 'Notes', path: '/notes' },
    { icon: Trash2, name: 'Trash', path: '/trash' },
    { icon: Star, name: 'Favorites', path: '/favorites' }
  ];

  return (
    <>
      {/* Navbar for small screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-50">
        <button onClick={toggleSidebar} className="text-gray-700 focus:outline-none">
          <Menu size={28} />
        </button>
        <img src={logo3} alt="Logo" className="h-10" />
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-300 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}>
        {/* Logo */}
        <div className="px-4 py-4">
          <NavLink to="/notes">
            <img className="mx-auto h-[140px]" src={logo2} alt="Logo" />
          </NavLink>
        </div>

        {/* Menu Items */}
        <div className="pt-4 flex-1 overflow-y-auto px-6 border-t border-gray-300">
          <nav>
            {menuItems.map((item) => (
              <NavLink
                to={item.path}
                key={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 ease-in-out ${
                    isActive ? 'bg-blue-50 text-blue-900 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`
                }
              >
                <item.icon className="mr-3" size={20} />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="px-6 py-4 border-t border-gray-300">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition-all duration-200 ease-in-out"
          >
            <LogOut className="mr-3 text-gray-400" size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Overlay to close sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;
