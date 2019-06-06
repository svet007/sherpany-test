import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'https://randomuser.me/api/';
const seed = 'sherpany';
const results = 50;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedNationalities = {};
  searchTerms: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    let url = baseUrl + `?seed=${seed}&results=${results}&page=${page}`;

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
      this.selectedNationalities = selectedNationalities;
  }

  getNationalities() {
    return this.selectedNationalities;
  }

  setSearchValue(searchTerms: string) {
    this.searchTerms.next(searchTerms)
  }
}
