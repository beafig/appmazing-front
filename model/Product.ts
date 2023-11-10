import { Categories } from './Category';

export class Product{
name: string;
stock: number;
price: number;
active: boolean;
date_added: Date;
fk_category: Categories
}