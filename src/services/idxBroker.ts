export interface IDXProperty {
  listingID: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  currentPrice: number;
  bedrooms: number;
  totalBaths: number;
  sqFt: number;
  acres: number;
  yearBuilt: number;
  status: string;
  propertyType: string;
  photos: string[];
  listDate: string;
  virtualTourURL?: string;
}
