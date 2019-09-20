import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ShowUser } from 'src/app/models/show-user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input()
  public users: ShowUser[];
  @Output()
  public selectedUser = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public selectUser(user: ShowUser) {
    this.selectedUser.emit(user.id);
  }
  public isAdmin(roles: {name: string}[]): boolean {
    let isAdmin = false;
    roles.forEach((role) => {
      if (role.name === 'Admin') {
        isAdmin = true;
      }
    });
    return isAdmin;
  }

}

