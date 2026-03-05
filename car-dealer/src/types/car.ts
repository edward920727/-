export type CarCategory = "sedan" | "suv" | "truck" | "coupe" | "sports" | "ev";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  category: CarCategory;
  transmission: "automatic" | "manual";
  fuel: "gasoline" | "diesel" | "hybrid" | "electric";
  imageUrl: string;
  highlight?: boolean;
}

