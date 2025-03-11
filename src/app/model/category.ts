import { Recipe } from "./Recipe";

export interface Category {
  _id?: string;
  name: string;
  image: string;
  description: string;
  sorting: number;
  addedAt?: Date;
  recipes?: Recipe[];
}