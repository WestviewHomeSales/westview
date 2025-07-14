export interface Property {
  id: number;
  status: 'ACTIVE' | 'PENDING' | 'SOLD';
  imageUrl: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqFt: number;
  pricePerSqFt: number;
  yearBuilt: number;
  lotSize: number;
  listedBy: string;
  listedDate: string;
  soldDate?: string;
  propertyType?: 'Single Family' | 'Townhouse';
  // Add URLs from Supabase
  moreDetailsUrl?: string;
  photoGalleryUrl?: string;
}
