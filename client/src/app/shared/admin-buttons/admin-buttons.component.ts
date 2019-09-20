import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShowUser } from 'src/app/models/show-user';

@Component({
  selector: 'app-admin-buttons',
  templateUrl: './admin-buttons.component.html',
  styleUrls: ['./admin-buttons.component.css']
})
export class AdminButtonsComponent implements OnInit {
@Input()
public user: ShowUser;
@Output()
public deleteUserEvent = new EventEmitter();
@Output()
public banUserEvent = new EventEmitter();
@Output()
public unbanUserEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public deleteUser() {
    this.deleteUserEvent.emit();
  }

  public banUser() {
    this.banUserEvent.emit();
  }

  public unbanUser() {
    this.unbanUserEvent.emit();
  }
}
