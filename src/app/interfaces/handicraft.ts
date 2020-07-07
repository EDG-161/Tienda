import {Place} from './place';

export interface Handicraft {
  name: string;
  images: string;
  link: string;
  weight?: string;
  tall?: string;
  width?: string;
  height?: string;
  message?: string;
  price?: number;
  largeDescription?: string;
  shortDescription?: string;
  image?: any[];
  id: string;
  about?: string;
  airtableId?: string;
  branches?: [];
  materials?: [];
  originPlace?: Place;
  artisan: string;
  type: string;
  state: string;
}
