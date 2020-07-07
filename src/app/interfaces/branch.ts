import {Handicraft} from './handicraft';

export interface Branch {
  id: string;
  name: string;
  handicrafts?: Handicraft;
}
