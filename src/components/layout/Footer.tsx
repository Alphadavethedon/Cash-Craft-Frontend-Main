import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <CreditCard className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-heading font-bold">Cash Craft</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Cash Craft is your trusted provider of quick and affordable loans in Kenya. 
              Apply online and receive funds directly to your M-Pesa account.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-primary-500">
                <span className="sr-only">Facebook</span>
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-primary-500">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-primary-500">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-medium">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-primary-500">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary-500">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/loans" className="text-gray-300 hover:text-primary-500">
                  Loan Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-medium">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-primary-500">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/loan-agreement" className="text-gray-300 hover:text-primary-500">
                  Loan Agreement
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="text-gray-300 hover:text-primary-500">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base font-medium">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-300">support@cashcraft.co.ke</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <span className="text-gray-300">+254 700 000 000</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-medium">Operating Hours</h4>
              <p className="text-sm text-gray-300 mt-1">
                Monday - Friday: 8:00 AM - 6:00 PM<br />
                Saturday: 9:00 AM - 1:00 PM<br />
                Sunday & Holidays: Closed
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Cash Craft. All rights reserved.<br />
            Cash Craft is regulated by the Central Bank of Kenya.
          </p>
        </div>
      </div>
    </footer>
  );
};