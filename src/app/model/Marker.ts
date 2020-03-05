// just an interface for type safety.
interface practice {
  comment: string;
}
export interface marker {
  _id?: string;
  locationName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  // label?: string;
  // country: string;
  draggable: boolean;
  practices: Array<practice>;
}
