import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { LoginService } from 'src/shared/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
    private loginService: LoginService,
    private router: Router
  ) { }

  userData = {
    username: '',
    oldPassword: '',
    newPassword: ''
  }

  ngOnInit(): void {
  }

  changePassword(){
    this.utilityService.asyncNotification('Changing your password', new Promise((resolve, reject)=>{
      this.loginService.changePassword(this.userData).then((res)=>{
        sessionStorage.clear();
        this.router.navigate(['login']);
        resolve(this.utilityService.resolveAsyncPromise('Password changed successfully'));
      }).catch((err)=>{
        console.log(err);
        reject(this.utilityService.rejectAsyncPromise('There was some error in changing your password. Please try again!'));
      })
    }))
  }

}
