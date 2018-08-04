export type Estimate = {usage: number; quota: number};

interface Storage extends StorageManager {
  estimate: () => Promise<Estimate>;
}

export interface StoragedNavigator extends Navigator {
  storage: Storage;
}

export interface StoragedTrack {
  id: string;
  size: string;
  sizeValue: number;
}

export interface StoragedTrackRequest {
  request: Request;
  data: StoragedTrack;
}
