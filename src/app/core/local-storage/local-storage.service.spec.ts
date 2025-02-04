import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';
import { StorageKeys } from '../../enum/storageKeys/storage-keys.enum';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    spyOn(localStorage, 'setItem').and.callFake(() => {}); 
    spyOn(localStorage, 'getItem').and.callFake(() => null); 
    spyOn(localStorage, 'removeItem').and.callFake(() => {}); 
    spyOn(localStorage, 'clear').and.callFake(() => {}); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store an item in localStorage', () => {
    const key = StorageKeys.PET_OF_THE_DAY;
    const value = { id: 1, name: 'Dog' };

    service.setItem(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  it('should retrieve an item from localStorage', () => {
    const key = StorageKeys.PET_OF_THE_DAY;
    const value = { id: 1, name: 'Dog' };

    (localStorage.getItem as jasmine.Spy).and.returnValue(JSON.stringify(value));

    const result = service.getItem<{ id: number; name: string }>(key);

    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  it('should return null if the item is not found in localStorage', () => {
    const key = StorageKeys.PET_OF_THE_DAY;

    (localStorage.getItem as jasmine.Spy).and.returnValue(null);

    const result = service.getItem<{ id: number; name: string }>(key);

    expect(localStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  it('should remove an item from localStorage', () => {
    const key = StorageKeys.PET_OF_THE_DAY;

    service.removeItem(key);

    expect(localStorage.removeItem).toHaveBeenCalledWith(key);
  });

  it('should clear all items from localStorage', () => {
    service.clear();

    expect(localStorage.clear).toHaveBeenCalled();
  });
});
