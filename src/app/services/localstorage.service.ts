import { Injectable } from '@angular/core';

@Injectable()
export class LocalstorageService {
  private prefix: string;

  constructor() { 
    this.prefix = '';
  }

  getItem(key: string) {
    return localStorage.getItem(this.prefix + key);
  }

  getAllItems() {
    return { ...localStorage };
  }

  setItem(key: string, value: string) {
    return localStorage.setItem(this.prefix + key, value);
  }

  clear() {
    for (const key in localStorage) {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    }
  }

  setPrefix(prefix: string) {
    this.prefix = prefix;
  }
}
