import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  set(key: string, value: any): boolean {
    if (this.containsLocalStorage()) {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): string {
    if (this.containsLocalStorage()) {
      return JSON.parse(localStorage.getItem(key)!);
    }
    return '';
  }

  remove(key: string): boolean {
    if (this.containsLocalStorage()) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.containsLocalStorage()) {
      localStorage.clear();
      return true;
    }
    return false;
  }

  private containsLocalStorage(): boolean {
    return typeof window !== 'undefined'
  }

}
