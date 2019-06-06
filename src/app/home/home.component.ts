import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { UserService } from '../user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const maxPageNum = 20;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('modalDetails') public modalDetails: TemplateRef<any>;

  page: number = 0;
  users: any[] = [];
  selectedUser: any;
  endOfCatalog: boolean = false;
  loading: boolean = true;
  searchTerms: string;
  cache: any[] = [];
  pendingRequestPage: number;


  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.userService.getUsers(this.page).subscribe((users) => {
      this.users = users;
      this.loading = false;
      this.fetchNextBatch();
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
      if (this.page < maxPageNum - 1) {
         this.page++;
         if (this.cache[this.page]) {
            this.users = this.users.concat(this.cache[this.page]);
         } else {
            this.loading = true;
            this.userService.getUsers(this.page).subscribe((users) => {
               this.users = this.users.concat(users);
               this.loading = false;
               this.fetchNextBatch();
            });
         }
      } else {
         this.endOfCatalog = true;
      }
   }

  private fetchNextBatch() {
    let nextPage = this.page + 1;
    if (nextPage < maxPageNum - 1 && this.pendingRequestPage != nextPage) {
      this.pendingRequestPage = nextPage;
      this.userService.getUsers(nextPage).subscribe((users) => {
        this.cache[nextPage] = users;
      });
    }
  }
}
