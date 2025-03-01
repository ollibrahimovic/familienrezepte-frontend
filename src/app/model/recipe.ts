import { Category } from "./category";

export interface Recipe {
    _id?: string;
    title: string;
    ingredients: string[];
    description: string;
    image: string | undefined;
    portionsangabe: string;
    category: Category;
    isFavorite: boolean;
  }