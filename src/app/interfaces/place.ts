import {Artisan} from './artisan';

export interface Place {
  name: string;
  artisans?: Artisan[];
  latitude: number;
  longitude: number;
  id: string;
  video: string;
  description?: string;
  handicraftsRelated?: string;
}
