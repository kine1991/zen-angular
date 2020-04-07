import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/user.actions';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public users;
  public loading;
  public currentUid;
  public usersSub: Subscription;

  constructor(
    private userService: UserService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new UserActions.FetchUsersStart());
    this.usersSub = this.store.select('user').subscribe(user => {
      this.users = user.users;
      this.loading = user.loading;
    });
    // this.userService.getAllUsers().subscribe(users => {
    //   this.users = users;
    // });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
