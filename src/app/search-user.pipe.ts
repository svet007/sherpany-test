import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users: any, searchTerms?: string): any {
    if (!searchTerms) return users;
    searchTerms = searchTerms.trim().toLowerCase();
    return users.filter(user => user.name.first.toLowerCase() == searchTerms || user.name.last.toLowerCase() == searchTerms);
  }

}
