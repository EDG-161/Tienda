import {Handicraft} from './handicraft';

export interface Artisan {
  name: string;
  image: string;
  ethnicGroup: string;
  language?: string;
  idiom: string;
  id: string;
  handicrafts?: Handicraft;
  video?: string;
  history?: string;
  dateCreated?: string;
  profile?: string;
  suffix?: string;
  languages?: string[];
  genre?: boolean;
  state?: string;
  place?: string;
  branch?: string;
}
