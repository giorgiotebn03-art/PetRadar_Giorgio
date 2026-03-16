export interface FoundPetCDto {

  id?: number;

  species: string;

  breed?: string;

  color: string;

  size: string;

  description: string;

  photo_url?: string;

  finder_name: string;

  finder_email: string;

  finder_phone: string;

  location: {
    type: "Point";
    coordinates: number[];
  };

  address: string;

  found_date: Date;

  created_at?: Date;

  updated_at?: Date;

}