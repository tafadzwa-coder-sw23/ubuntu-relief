import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-400">Ubuntu Relief AI</h3>
            <p className="text-slate-400 text-sm">
              Empowering communities in Zimbabwe and Africa with AI-driven insights for faster, more effective pandemic response.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-400">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white">For NGOs</a></li>
              <li><a href="#" className="hover:text-white">For Donors</a></li>
              <li><a href="#" className="hover:text-white">Gov Reports</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-400">Contact</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-slate-400 hover:text-white"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-white"><Mail className="w-5 h-5" /></a>
            </div>
            <p className="text-sm text-slate-400">Harare, Zimbabwe</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Ubuntu Relief Initiative. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
