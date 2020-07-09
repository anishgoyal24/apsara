import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/shared/services/company.service';
import { UtilityService } from 'src/shared/services/utility.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private utilityService: UtilityService
  ) { }

  companyName: string;

  ngOnInit(): void {
  }

  onCreateCompany(companyName){
    this.utilityService.asyncNotification('Adding brand please wait...', new Promise((resolve, reject)=>{
      this.companyService.addCompany(companyName).then((res)=>{
        console.log(res);
        resolve(this.utilityService.resolveAsyncPromise('Brand Added!'));
      }).catch((err)=>{
        console.log(err);
        reject(this.utilityService.rejectAsyncPromise('There was some error adding the brand. Please try again later!'));
      })
    }))
  }

}
