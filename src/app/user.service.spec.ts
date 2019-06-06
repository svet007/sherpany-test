import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get']) }
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
