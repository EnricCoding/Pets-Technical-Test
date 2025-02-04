import { Injectable } from '@angular/core';
import { StorageKeys } from '../../enum/storageKeys/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem<T>(key: StorageKeys, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`[LocalStorageService] Failed to set item for key "${key}":`, error);
    }
  }

  getItem<T>(key: StorageKeys): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error(`[LocalStorageService] Failed to parse item for key "${key}":`, error);
      return null;
    }
  }

  removeItem(key: StorageKeys): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[LocalStorageService] Failed to remove item for key "${key}":`, error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('[LocalStorageService] Failed to clear localStorage:', error);
    }
  }
}
