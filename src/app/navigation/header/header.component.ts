import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authChange.subscribe(isAuth => {
      this.isAuth = isAuth;
    })
  }

  logOut(){
    this.authService.logOut();
  }
}
