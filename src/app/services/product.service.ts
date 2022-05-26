import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {ProductDto} from '../model/dto/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService{

  private productUrl = '/products';

  constructor(http: HttpClient) {
    super(http);
  }

  public async getProductGET(id: string): Promise<ProductDto> {
    const url = `${this.productUrl}/${id}`;
    const options = {
      responseType: 'json' as const
    };

    return (await this.restCall('GET', url, options));
  }

  public async getProductsGET(): Promise<ProductDto[]> {
    const options = {
      responseType: 'json' as const
    };

    return (await this.restCall('GET', this.productUrl, options));
  }

  public async addProductPOST(product: ProductDto): Promise<void> {
    const options = {
      body: product,
      responseType: 'json' as const
    };
    return (await this.restCall('POST', this.productUrl, options));
  }

  public async updateProductPUT(product: ProductDto): Promise<void> {
    const options = {
      body: product,
      responseType: 'json' as const
    };

    return (await this.restCall('PUT', this.productUrl, options));
  }

  public async deleteProductDELETE(productId: string): Promise<void> {
    const url = `${this.productUrl}/${productId}`;
    const options = {
      responseType: 'json' as const
    };

    return (await this.restCall('DELETE', url, options));
  }
}
