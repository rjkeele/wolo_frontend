interface person {
  name: string;
  email?:string;
  contact?: string;
}

// just an interface for type safety.
export interface event {
  _id?: string;
  title: string;
  description: string;
  location: string;
  e_date: string;
  e_time: string;
  img: string;
  interested: Array<person>;
  registered: Array<person>;
}
  