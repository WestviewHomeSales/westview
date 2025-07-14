import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-4 px-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
        <div>
          <a href="mailto:WestviewHomeSales@gmail.com" className="hover:text-blue-600 transition-colors">WestviewHomeSales@gmail.com</a> | <a href="tel:4075227375" className="hover:text-blue-600 transition-colors">(407) 522-7375</a>
        </div>
        <div>© {currentYear} <a href="/" className="hover:text-blue-600 transition-colors">Borchini Realty</a></div>
      </div>
    </footer>
  );
};
