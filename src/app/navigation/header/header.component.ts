import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // @ViewChild('navMenu') navMenu:
  @ViewChild('navMenu', { static: false }) navMenu: ElementRef;
  @ViewChild('navBurger', { static: false }) navBurger: ElementRef;

  isAuth;
  isFetching = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isFetching = true;
    this.authService.user$.subscribe(
      userData => {
        if (userData) {
          this.isAuth = true;
          this.isFetching = false;
        } else {
          this.isAuth = false;
          this.isFetching = false;
        }
      },
      error => {
        this.isAuth = false;
        this.isFetching = false;
      }
    );
  }

  logOut() {
    this.authService.logOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }

  toggleNavbar() {
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
}

// (function() {
//   var burger = document.querySelector('.burger');
//   var nav = document.querySelector('#'+burger.dataset.target);

//   burger.addEventListener('click', function(){
//     burger.classList.toggle('is-active');
//     nav.classList.toggle('is-active');
//   });
// })();
