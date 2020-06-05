import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  username: string;

  password: string;

  ngOnInit(): void {
  }

  login(){
    new Promise((resolve, reject)=>{
      this.loginService.login(this.username, this.password).then((res: any)=>{
        if (res.message=="Successfully Authenticated!"){
          sessionStorage.setItem("loggedIn", "true");
          resolve()
          this.router.navigate(['/admin']);
        }
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }

}
