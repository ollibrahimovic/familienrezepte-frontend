import { Category } from "./Category";
import { Ingredient } from "./Ingredient";

export interface Recipe {
  _id?: string;
  title: string;
  servings: string;
  description: string;
  ingredients: Ingredient[];
  category: Category | string;
  image: string| undefined;
  preparationTime: number;
  addedAt?: Date;
  isFavorite: Boolean;
}
