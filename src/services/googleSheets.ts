export interface SoldProperty {
  address: string;
  city: string;
  state: string;
  zip: string;
  model: string;
  beds: number;
  baths: number;
  sqFt: number;
  price: number;
  soldDate: string;
  propertyType: 'Single Family' | 'Townhouse';
  builder: string;
}
