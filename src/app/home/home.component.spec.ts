import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchUserPipe } from '../search-user.pipe';
import { HomeComponent } from './home.component';
import { UserService } from '../user.service';
import { Subject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService = jasmine.createSpyObj('UserService', ['getUsers']);
  userService.getUsers.and.returnValue(of([]));
  userService.searchTerms = new Subject<string>;
  let modalService: NgbModal = jasmine.createSpyObj('NgbModal', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        SearchUserPipe
      ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: NgbModal, useValue: modalService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should show details', () => {
    component.selectedUser = {};
    component.showDetails({ location: { street: 'any' } });
    expect(component.selectedUser.location.street).toEqual('any');
    expect(modalService.open).toHaveBeenCalled();
  });

  it('should handle onScroll event', () => {
    component.endOfCatalog = false;
    component.page = 19;
    component.onScroll();
    expect(component.endOfCatalog).toBe(true);

    component.endOfCatalog = false;
    component.page = 0;
    component.onScroll();
    expect(component.endOfCatalog).toBe(false);

    component.page = 0;
    component.onScroll();
    expect(component.page).toEqual(1);

    component.page = 0;
    component.users = [];
    component.cache[1] = ['test'];
    component.onScroll();
    expect(component.users).toEqual(['test']);

    component.page = 0;
    component.users = [];
    component.cache[1] = null;
    component.onScroll();
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });

  it('should fetch next batch', () => {
    component.page = 0;
    component.pendingRequestPage = null;
    component.fetchNextBatch();
    expect(component.pendingRequestPage).toEqual(1);
    expect(userService.getUsers).toHaveBeenCalled();
  });
});
