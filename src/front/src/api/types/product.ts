export interface IProduct {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string;
  hotel: IHotel;
  country: ICountry;
  availableCount: number;
}

export interface IHotel {
  id: number;
  title: string;
  stars: number;
}

export interface ICountry {
  id: number;
  title: string;
}
