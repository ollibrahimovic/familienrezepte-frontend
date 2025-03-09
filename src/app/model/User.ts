import { Recipe } from "./Recipe";

export interface User {
  _id?: string;
  userId: string;
  favorites: Recipe[];
}
  