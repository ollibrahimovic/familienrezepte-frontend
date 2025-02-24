import { Recipe } from "./recipe";

export interface Category {
  _id?: string;
  name: string;
  sort:number;
  recipes: Recipe[]
}