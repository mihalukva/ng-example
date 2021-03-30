import { Storage } from './storage.interface';
export class LocalStorageService implements Storage {
  constructor(private name: string = 'storage') {}
  getItem(key: string): string | null {
    const storage: any = this.getAll();
    if (storage[key]) {
      return storage[key];
    } else {
      return null;
    }
  }
  setItem(key: string, value: string): void {
    const storage: any = this.getAll();
    storage[key] = value;
    localStorage.setItem(this.name, JSON.stringify(storage));
  }
  deleteItem(key: string): void {
    const storage: any = this.getAll();
    delete storage[key];
    localStorage.setItem(this.name, JSON.stringify(storage));
  }

  clear(): void {
    localStorage.removeItem(this.name);
  }
  length(): number {
    const storage: any = this.getAll();
    return Object.keys(storage).length;
  }

  getAll(): any {
    const storage: string | null = localStorage.getItem(this.name);
    if (storage === null) {
      return {};
    } else {
      return JSON.parse(storage);
    }
  }
  
}
