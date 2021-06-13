import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl = environment.apiUrl;
  endpoints = {
    employees: {
      root: `${this.apiUrl}/employees`
    }
  }
  constructor() { }
}
