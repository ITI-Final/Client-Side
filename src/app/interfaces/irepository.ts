export interface IRepository<T> {
   getAll(): T[];
   getById(id: number): T;
   add(entity: T): any;
   update(id: number, entity: T): any;
   delete(id: number): any;
}
