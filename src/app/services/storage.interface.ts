export interface Storage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  deleteItem(key:string):void;
  clear(): void;
  length(): number;
  getAll():any;
}
