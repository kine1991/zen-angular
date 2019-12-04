import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.authService.user$
  }

  logOut(){
    this.authService.logOut()
  }

}
