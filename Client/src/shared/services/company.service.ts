import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Function to retrieve companies list
   */
  getCompanies(){
    return this.http.get(environment.COMPANY_URL + '/').toPromise();
  }

  /**
   * Add a new company
   * @param companyName 
   */
  addCompany(companyName){
    return this.http.post(environment.COMPANY_URL + '/add', {companyName}).toPromise();
  }

  /**
   * Remove a company
   * @param companyId CompanyId of the company to be removed
   */
  removeCompany(companyId: any){
    return this.http.post(environment.COMPANY_URL + '/remove', {companyId}).toPromise();
  }
}
