import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    // If we're already on the homepage, scroll to top instead of navigating
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const getLinkClass = (path: string) => {
    return `hover:text-blue-600 transition-colors ${
      location.pathname === path ? 'text-blue-600 font-medium' : 'text-gray-600'
    }`;
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 transition-shadow duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={handleLogoClick}>
              <span className="font-bold text-blue-600 text-xl">Borchini</span>
              <span className="ml-1 text-xl">Realty</span>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/" className={getLinkClass('/')}>
              Current Listings
            </Link>
            <Link to="/sold" className={getLinkClass('/sold')}>
              Sold
            </Link>
            <Link to="/floor-plans" className={getLinkClass('/floor-plans')}>
              Floor Plans
            </Link>
            <Link to="/useful-info" className={getLinkClass('/useful-info')}>
              Useful Info
            </Link>
            <Link to="/contact" className={getLinkClass('/contact')}>
              Contact
            </Link>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4 text-sm border-t border-gray-100 mt-3">
            <Link to="/" className={getLinkClass('/')}>
              Current Listings
            </Link>
            <Link to="/sold" className={getLinkClass('/sold')}>
              Sold
            </Link>
            <Link to="/floor-plans" className={getLinkClass('/floor-plans')}>
              Floor Plans
            </Link>
            <Link to="/useful-info" className={getLinkClass('/useful-info')}>
              Useful Info
            </Link>
            <Link to="/contact" className={getLinkClass('/contact')}>
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
