import React, { useEffect, useState } from 'react';
import { Clock, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { Property } from '../types/property';
import { fetchActiveProperties } from '../lib/supabase';
import { mapActivePropertyToProperty } from '../utils/propertyMapper';

export const HomePage: React.FC = () => {
  const [activeProperties, setActiveProperties] = useState<Property[]>([]);
  const [sortedProperties, setSortedProperties] = useState<Property[]>([]);
  const [sortOption, setSortOption] = useState('date-new');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Borchini Realty | Current Listings';
    loadActiveProperties();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const loadActiveProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading active properties...');
      
      const data = await fetchActiveProperties();
      console.log('Raw active data from Supabase:', data);
      
      if (data.length === 0) {
        console.log('No data returned from Supabase');
        setActiveProperties([]);
        setSortedProperties([]);
        return;
      }
      
      const mappedProperties = data.map(mapActivePropertyToProperty);
      console.log('Mapped active properties:', mappedProperties);
      
      setActiveProperties(mappedProperties);
      sortProperties(mappedProperties, 'date-new');
    } catch (err) {
      console.error('Error loading active properties:', err);
      setError('Failed to load active properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const sortProperties = (props: Property[], option: string) => {
    const sorted = [...props];
    if (option === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === 'sqft-asc') {
      sorted.sort((a, b) => a.sqFt - b.sqFt);
    } else if (option === 'sqft-desc') {
      sorted.sort((a, b) => b.sqFt - a.sqFt);
    } else if (option === 'date-new') {
      // Sort by listing date (newest first)
      sorted.sort((a, b) => {
        const dateA = new Date(a.listedDate + 'T12:00:00');
        const dateB = new Date(b.listedDate + 'T12:00:00');
        return dateB.getTime() - dateA.getTime();
      });
    } else if (option === 'date-old') {
      // Sort by listing date (oldest first)
      sorted.sort((a, b) => {
        const dateA = new Date(a.listedDate + 'T12:00:00');
        const dateB = new Date(b.listedDate + 'T12:00:00');
        return dateA.getTime() - dateB.getTime();
      });
    }
    setSortedProperties(sorted);
    setSortOption(option);
    setCurrentPage(1);
  };

  // Get the most recent listing date from properties
  const latestUpdate = activeProperties.reduce((latest, property) => {
    const propertyDate = new Date(property.listedDate + 'T12:00:00');
    return propertyDate > latest ? propertyDate : latest;
  }, new Date(0));

  const formattedUpdateTime = latestUpdate.getTime() > 0 ? latestUpdate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  }) : new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const totalPages = itemsPerPage === 0 ? 1 : Math.ceil(sortedProperties.length / itemsPerPage);
  const startIndex = itemsPerPage === 0 ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex = itemsPerPage === 0 ? sortedProperties.length : startIndex + itemsPerPage;
  const currentProperties = sortedProperties.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-lg text-gray-600">Loading active properties from Supabase...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">
            Find Your <span className="text-blue-600">Dream Home</span> in Westview
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={loadActiveProperties}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="max-w-3xl">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          Find Your <span className="text-blue-600">Dream Home</span> in Westview
        </h1>
        <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
          Browse our current listings in the beautiful Westview community of Poinciana, Florida. 
          Discover affordable luxury in a family-friendly neighborhood.
        </p>
      </div>

      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
          Current Listings
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div className="flex items-center text-xs md:text-sm text-gray-600">
            <Clock size={18} className="mr-2" />
            <span>IDX Data Updated: {formattedUpdateTime}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-600">Show:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
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
              className={`text-xs md:text-sm flex items-center px-3 py-1 rounded-md transition-colors ${
                sortOption.startsWith('date') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => sortProperties(activeProperties, sortOption.startsWith('date') ? 'date-old' : 'date-new')}
            >
              <span className="mr-2">Date</span>
              <ChevronDown size={14} />
            </button>
            
            <button 
              className={`text-xs md:text-sm flex items-center px-3 py-1 rounded-md transition-colors ${
                sortOption.startsWith('price') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => sortProperties(activeProperties, sortOption.startsWith('price') ? 'price-desc' : 'price-asc')}
            >
              <span className="mr-2">Price</span>
              <ChevronDown size={14} />
            </button>

            <button 
              className={`text-xs md:text-sm flex items-center px-3 py-1 rounded-md transition-colors ${
                sortOption.startsWith('sqft') ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              onClick={() => sortProperties(activeProperties, sortOption.startsWith('sqft') ? 'sqft-desc' : 'sqft-asc')}
            >
              <span className="mr-2">Sq Ft</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {activeProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No active properties found in Supabase.</p>
            <p className="text-gray-500 text-sm mt-2">Check the browser console for connection details.</p>
            <button 
              onClick={loadActiveProperties}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        ) : (
          <>
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
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
