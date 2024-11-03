import Link from 'next/link';
import {
  Users,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  Settings,
  Box,
  AlertCircle,
  Home,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: Box, label: "Services", path: "/services" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: AlertCircle, label: "Disputes", path: "/disputes" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="h-8 w-8 rounded-full bg-indigo-600" />
        <span className="text-xl font-bold">Admin Panel</span>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
