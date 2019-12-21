import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$
  userData

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.authService.user$;
    // this.userData = this.authService.userData$.subscribe(userData => {
    //   console.log('home ', userData)
    //   this.userData = userData
    // })
  }



  // logOut(){
  //   this.authService.logOut()
  // }

}
