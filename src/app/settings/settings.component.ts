import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  nationalities: any = {
    ch: false,
    es: false,
    fr: false,
    gb: false
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.nationalities = this.userService.getNationalities();
  }

  onChange() {
    this.userService.setNationalities(this.nationalities);
  }
}
