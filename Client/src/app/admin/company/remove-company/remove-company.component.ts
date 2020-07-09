import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/shared/services/utility.service';
import { CompanyService } from 'src/shared/services/company.service';

@Component({
  selector: 'app-remove-company',
  templateUrl: './remove-company.component.html',
  styleUrls: ['./remove-company.component.scss']
})
export class RemoveCompanyComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private utilityService: UtilityService
  ) { }

  companies = [];

  ngOnInit(): void {
    new Promise((resolve, reject)=>{
      this.companyService.getCompanies().then((res)=>{
        this.companies = res['companies'];
        resolve();
      }).catch((err)=>{
        console.log(err);
        reject();
      })
    })
  }

  delete(companyId: any){
    this.utilityService.asyncNotification('Please wait while we reomve the brand', new Promise((resolve, reject)=>{
      this.companyService.removeCompany(companyId).then((res)=>{
        this.removeFromList(companyId);
        resolve(this.utilityService.resolveAsyncPromise('Brand Removed!'));
      }).catch((err)=>{
        reject(this.utilityService.rejectAsyncPromise('There was some error in removing the brand, please try again later!'));
      })
    }))
  }


  removeFromList(companyId: any){
    var index = -1;
    for (var i = 0; i < this.companies.length; i++){
      if (this.companies[i]._id == companyId){
        index = i;
        break;
      }
    }

    if (index > -1){
      this.companies.splice(index, 1);
    }
  }

}
