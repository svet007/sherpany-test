import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SettingsComponent],
      providers: [
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get']) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
