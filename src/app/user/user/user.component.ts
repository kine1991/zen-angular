import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  public user

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: Params) => {
        return this.userService.getUserById(params.get('userId'))
      })
    )
    .subscribe((user) => {
      this.user = user
      // console.log('user')
      // console.log(user)
    })
  }

  ngOnDestroy(){

  }



}
