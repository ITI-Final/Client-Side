import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public searchText: BehaviorSubject<string>;

  constructor() {
        this.searchText=new BehaviorSubject<string>("");

   }
   getSearchText():Observable<string> {

    return this.searchText.asObservable()
}

updateSearchText(items: string) {

    this.searchText.next(items);


};
}
