import React, { useEffect } from 'react';
import { ExternalLink, Bed, Bath, Square } from 'lucide-react';
import { taylorMorrisonNeighborhoods, lennarNeighborhoods } from '../data/floorPlans';

interface FloorPlan {
  name: string;
  sqft: string;
  beds: string;
  baths: string;
  url: string;
}

interface Neighborhood {
  id: string;
  name: string;
  description: string;
  plans: FloorPlan[];
}

const FloorPlanCard: React.FC<{ plan: FloorPlan }> = ({ plan }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{plan.name}</h3>
      <div className="grid grid-cols-3 gap-3 mb-4 text-center">
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-1">
            <Square size={16} className="text-gray-500" />
          </div>
          <span className="text-lg font-semibold">{plan.sqft}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">SQ FT</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-1">
            <Bed size={16} className="text-gray-500" />
          </div>
          <span className="text-lg font-semibold">{plan.beds}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">BEDS</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center mb-1">
            <Bath size={16} className="text-gray-500" />
          </div>
          <span className="text-lg font-semibold">{plan.baths}</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">BATHS</span>
        </div>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={plan.url}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-white shadow h-9 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700"
      >
        View PDF
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
};

const NeighborhoodSection: React.FC<{ neighborhood: Neighborhood; builder: string }> = ({ neighborhood, builder }) => {
  return (
    <div id={`${builder.toLowerCase()}-${neighborhood.id}`} className="mb-10">
      <h3 className="text-xl font-semibold mb-4">{neighborhood.name}</h3>
      <p className="text-gray-600 mb-4">{neighborhood.description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {neighborhood.plans.map((plan) => (
          <FloorPlanCard key={plan.name} plan={plan} />
        ))}
      </div>

      <div className="text-right">
        <a
          href={`#${builder.toLowerCase()}`}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 underline-offset-4 hover:underline h-9 px-4 py-2 text-blue-600"
        >
          Back to {builder}
        </a>
      </div>
    </div>
  );
};

export const FloorPlansPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Borchini Realty | Floor Plans';
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 md:py-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Westview Floor Plans</h1>
        <p className="text-gray-600 mb-8">
          Browse our collection of floor plans from our premier home builders. Each floor plan showcases thoughtful designs and modern features to suit a variety of lifestyles and preferences.
        </p>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Skip to Builder:</h2>
        <div className="flex flex-wrap gap-2">
          <a 
            href="#taylor-morrison"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border-blue-600 text-blue-600"
          >
            Taylor Morrison
          </a>
          <a 
            href="#lennar"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 border-blue-600 text-blue-600"
          >
            Lennar
          </a>
        </div>
      </div>

      {/* Taylor Morrison Section */}
      <section id="taylor-morrison" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Taylor Morrison</h2>
        <p className="text-gray-600 mb-6">
          Taylor Morrison offers a variety of floor plans across multiple neighborhoods in Westview, including single-family homes and townhomes.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Neighborhoods:</h3>
          
          <div className="flex flex-wrap gap-2">
            {taylorMorrisonNeighborhoods.map((neighborhood) => (
              <a
                key={neighborhood.id}
                href={`#taylor-morrison-${neighborhood.id}`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
              >
                {neighborhood.name}
              </a>
            ))}
          </div>
        </div>

        {taylorMorrisonNeighborhoods.map((neighborhood) => (
          <NeighborhoodSection
            key={neighborhood.id}
            neighborhood={neighborhood}
            builder="taylor-morrison"
          />
        ))}
      </section>

      {/* Lennar Section */}
      <section id="lennar" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Lennar</h2>
        <p className="text-gray-600 mb-6">
          Lennar offers numerous floor plans across several neighborhoods in Westview, with options for every lifestyle and need.
        </p>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Neighborhoods:</h3>
          <div className="flex flex-wrap gap-2">
            {lennarNeighborhoods.map((neighborhood) => (
              <a
                key={neighborhood.id}
                href={`#lennar-${neighborhood.id}`}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs"
              >
                {neighborhood.name}
              </a>
            ))}
          </div>
        </div>

        {lennarNeighborhoods.map((neighborhood) => (
          <NeighborhoodSection
            key={neighborhood.id}
            neighborhood={neighborhood}
            builder="lennar"
          />
        ))}
      </section>
    </main>
  );
};
