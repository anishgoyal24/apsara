import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';
import { Router } from '@angular/router';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  username: string;

  password: string;

  ngOnInit(): void {
  }

  login(){
    this.utilityService.asyncNotification('Logging you in...', new Promise((resolve, reject)=>{
      this.loginService.login(this.username, this.password).then((res: any)=>{
        if (res.message=="Successfully Authenticated!"){
          sessionStorage.setItem("loggedIn", "true");
          resolve(this.utilityService.resolveAsyncPromise('Welcome back Hitesh!'));
          this.router.navigate(['/admin']);
        }
      }).catch((err)=>{
        console.log(err);
        reject(this.utilityService.rejectAsyncPromise('There was some error logging you in. Please try again later!'));
      })
    }))
  }

}
