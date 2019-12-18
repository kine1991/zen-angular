import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuth;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.authChange$.subscribe(isAuth => {
      this.isAuth = isAuth;
    })
  }

  logOut(){
    this.authService.logOut()
    .then(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}
