import { ICategory } from "../category/category.model";
 export interface IProduct {
    category: ICategory;
    name: string;
    path: string;
    type: string;
    description: string;
    volume: string;
    alcohol: string;
    color: string;
    grape: string;
    aroma: string;
    taste: string;
    price: number;
    image: string;
    id?: number;
    count:number;
    stock: number;
} 

