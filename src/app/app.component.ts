import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // user$

  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    // console.log('App')
    // this.authService.autoLogin().subscribe( res => {
    //   console.log('App', res)
    // })
    
    // this.authService.userData$.subscribe(userData => {
    //   console.log('userData', userData)
    //   // this.userData = userData;
    // })
  }


}
