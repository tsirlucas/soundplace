import {Track} from './Track';

export type Estimate = {usage: number; quota: number};

interface Storage {
  estimate: () => Promise<Estimate>;
}

export interface StoragedNavigator extends Navigator {
  storage: Storage;
}

export interface StoragedTrack extends Track {
  size: string;
  sizeValue: number;
}

export interface StoragedTrackRequest {
  request: Request;
  data: StoragedTrack;
}
