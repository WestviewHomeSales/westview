import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Find Your <span className="text-blue-600">Dream Home</span> in Westview
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Browse our current listings in the beautiful Westview community of Poinciana, Florida. 
          Discover affordable luxury in a family-friendly neighborhood.
        </p>
      </div>
    </section>
  );
};
