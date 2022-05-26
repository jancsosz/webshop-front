import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  setAccessToken(accessToken: string): void {
    localStorage.setItem('access-token', accessToken);
  }
}
