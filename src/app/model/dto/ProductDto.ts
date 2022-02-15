import {ProductCategory} from './ProductCategory';

export class ProductDto {
  id: number;
  name: string;
  price: number;
  quantityInStock: number;
  category: ProductCategory;
  description: string;

  ratingIdList: number[];
}
