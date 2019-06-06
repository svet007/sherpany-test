import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('modalDetails') public modalDetails: TemplateRef<any>;

  users: any[] = [];
  selectedUser: any;
  endOfCatalog: boolean = false;
  loading: boolean = false;
  searchTerms: string;

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.userService.searchTerms.subscribe((term) => {
      this.searchTerms = term;
    });
  }

  showDetails(user: any) {
    this.selectedUser = user;
    this.modalService.open(this.modalDetails);
  }

  onScroll() {
    if (this.userService.setNextPage()) {
      this.loading = true;
      this.userService.getUsers().subscribe((users) => {
        this.users = this.users.concat(users);
        this.loading = false;
      });
    } else {
      this.endOfCatalog = true;
    }
  }
}
