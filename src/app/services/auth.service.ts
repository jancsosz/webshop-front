import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }

  public async loginPOST(username: string, password: string): Promise<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(`${username}:${password}`));

    const options = {
      headers
    };

    return (await this.restCall('POST', '/', options));
  }
}
