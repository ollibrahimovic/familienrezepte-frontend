import { Recipe } from "./recipe";

export interface Category {
  _id?: string;
  name: string;
  image: string;
  sort:number;
  recipes: Recipe[]
}