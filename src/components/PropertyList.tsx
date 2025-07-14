import React, { useState, useEffect, useRef } from 'react';
import { PropertyCard } from './PropertyCard';
import { Clock, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { properties } from '../data/properties';

export const PropertyList: React.FC = () => {
  const [sortOption, setSortOption] = useState('date-new');
  const [sortedProperties, setSortedProperties] = useState(() => {
    const sorted = [...properties];
    sorted.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
    return sorted;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const propertyListRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (propertyListRef.current) {
      propertyListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  // Get the most recent listed date from properties
  const latestUpdate = properties.reduce((latest, property) => {
    const propertyDate = new Date(property.listedDate);
    return propertyDate > latest ? propertyDate : latest;
  }, new Date(0));

  const formattedUpdateTime = new Date(latestUpdate).toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const handleSortChange = (option: string) => {
    setSortOption(option);
    
    const sorted = [...properties];
    if (option === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === 'date-new') {
      sorted.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
    } else if (option === 'date-old') {
      sorted.sort((a, b) => new Date(a.listedDate).getTime() - new Date(b.listedDate).getTime());
    }
    
    setSortedProperties(sorted);
    setCurrentPage(1);
    scrollToTop();
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    scrollToTop();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    scrollToTop();
  };

  const totalPages = itemsPerPage === 0 ? 1 : Math.ceil(sortedProperties.length / itemsPerPage);
  const startIndex = itemsPerPage === 0 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage === 0 ? sortedProperties.length : startIndex + itemsPerPage;
  const currentProperties = sortedProperties.slice(startIndex, endIndex);

  return (
    <section className="py-8 px-4 bg-gray-50" ref={propertyListRef}>
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Current Listings</h2>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center text-gray-600 mb-4 sm:mb-0">
            <Clock size={18} className="mr-2" />
            <span className="text-sm">IDX Data Updated: {formattedUpdateTime}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-600">Show:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value={12}>12</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={0}>All</option>
              </select>
            </div>
            
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                sortOption.startsWith('date') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
              onClick={() => handleSortChange(sortOption.startsWith('date') ? 'date-old' : 'date-new')}
            >
              Date
              <ChevronDown size={16} className="ml-1" />
            </button>
            
            <button
              className={`px-4 py-2 rounded-md flex items-center ${
                sortOption.startsWith('price') ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'
              }`}
              onClick={() => handleSortChange(sortOption.startsWith('price') ? 'price-desc' : 'price-asc')}
            >
              Price
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, sortedProperties.length)} of {sortedProperties.length} listings
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
