import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'https://randomuser.me/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedNationalities = {};
  page: number = 0;
  searchTerms = new Subject<string>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    let url = baseUrl + "?seed=sherpany&results=50";

    url += `&page=${this.page}`;

    let nat = [];
    for (let key in this.selectedNationalities) {
      if (this.selectedNationalities[key]) nat.push(key);
    }

    if (nat.length > 0) {
      url += "&nat=" + nat.join(',');
    }
    return this.http.get(url).pipe(
      map(response => response['results'])
    );
  }

  setNationalities(selectedNationalities) {
    let equal = true;
    const keys = Array.from(new Set(Object.keys(selectedNationalities).concat(Object.keys(this.selectedNationalities))));
    for (let key of keys) {
      if (selectedNationalities[key] != this.selectedNationalities[key]) {
        equal = false;
        break;
      }
    }
    if (!equal) {
      this.selectedNationalities = selectedNationalities;
      this.page = 0;
    }
  }

  getNationalities() {
    return { ...this.selectedNationalities };
  }

  setNextPage() {
    if (this.page === 19) {
      return false;
    } else {
      this.page++;
      return true;
    }
  }

  setSearchValue(searchTerms: string) {
    this.searchTerms.next(searchTerms)
  }
}
