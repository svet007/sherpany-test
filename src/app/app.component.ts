import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchValue: string;

  constructor(private userService: UserService) { }

  search(searchTerms: string) {
    this.userService.setSearchValue(searchTerms);
  }
}
