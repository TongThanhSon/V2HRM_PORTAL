import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, last, map, tap, retry } from 'rxjs/operators';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { Observable } from 'rxjs';
import { Globals } from '../common/globals';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
})



export interface IServerModel {
  modelName: string,
  loginUrl: string,
  refreshTokenUrl: string,
  getEmployeeInfoUrl?: string,
  getAccountInfoUrl?: string,
  updateAccountInfoUrl?: string,
  updateEmployeeMainInfoUrl?: string,
  updateEmployeePassportUrl?: string,
  updateEmployeeVisaUrl?: string,
  updateEmployeeEducationUrl?: string,
  updateEmployeeWorkPermitUrl?: string,
  updateEmployeeCertificateUrl?: string,
  updateEmployeeBankUrl?: string,
  getGendersUrl?: string,
  getProvincesUrl?: string,
  getDistrictsUrl?: string,
  getWardsUrl?: string,
  getEducationUrl?: string,
  getUserbankUrl?: string,
  getBonusListUrl?: string,
  getSituationListUrl?: string,
  getPaperListUrl?: string,
  getDisciplineListUrl?: string,
  getContractListUrl?: string,
  getWorkingListUrl?: string,
  getInschangeListUrl?: string,
  updateEmployeeInfoUrl?: string,
  updateEmployeeAddressUrl?: string,
  updateEmployeeCurAddressUrl?: string,
  updateEmployeeContactInfoUrl?: string,

}

export const V2Hrm2022: IServerModel = {
  modelName: 'HiSraff2022',
  loginUrl: 'authen/clientslogin',
  refreshTokenUrl: 'authen/refreshtoken',
  getEmployeeInfoUrl: 'client/profile/getemployeeinfo',
  // updateAccountInfoUrl: 'client/profile/updateemployee',
  updateAccountInfoUrl: 'client/profile/employeeedit',
  updateEmployeeMainInfoUrl: 'client/profile/employeemaininfoedit',

  updateEmployeeInfoUrl: 'client/profile/employeeinfoedit',
  updateEmployeeAddressUrl: 'client/profile/employeeaddressedit',
  updateEmployeeCurAddressUrl: 'client/profile/employeecuraddressedit',
  updateEmployeeContactInfoUrl: 'client/profile/employeecontactinfoedit',

  updateEmployeePassportUrl: 'client/profile/employeepassportedit',
  updateEmployeeVisaUrl: 'client/profile/employeevisaedit',
  updateEmployeeEducationUrl: 'client/profile/employeeeducationedit',
  updateEmployeeWorkPermitUrl: 'client/profile/employeeworkpermitedit',
  updateEmployeeCertificateUrl: 'client/profile/employeecertificateedit',
  updateEmployeeBankUrl: 'client/profile/employeebankedit',
  getGendersUrl: 'hr/otherlist/gender',
  getProvincesUrl: 'hr/province/getlistprovince',
  getDistrictsUrl: 'hr/province/getlistdistrict',
  getWardsUrl: 'hr/province/getlistward',
  getEducationUrl: 'client/profile/getemployeeinfo',
  getUserbankUrl: 'client/profile/getbanklist',
  getBonusListUrl: 'client/profile/getbonusinfo',
  getSituationListUrl: 'client/profile/getemployeefamily',
  getPaperListUrl: 'client/profile/getlistemployeepaper',
  getDisciplineListUrl: 'client/profile/getdisciplineinfo',
  getContractListUrl: 'client/profile/getcontractinfo',
  getWorkingListUrl: 'client/profile/getworkinginfo',
  getInschangeListUrl: 'client/profile/getinschangeinfo',
}


@Injectable({
  providedIn: 'root'
})
export class CommonHttpRequestService {

  private handleError: HandleError;
  private apiUrl!:string;
  constructor(
    private http: HttpClient,
    @Inject(Globals) private globals: Globals,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('CommonHttpRequestService');
    this.apiUrl = globals.apiURL.toString();
    console.log("this.apiUrl",this.apiUrl)
  }

  commonPostRequest(name: string, url: string, payload: any): Observable<any> {
    url = this.apiUrl + url;
    return this.http.post<any>(url, payload, {
      headers: headers, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(

        retry(3),

        tap({
          // subscribe: () => console.log(`tap subscribe ${name}`),
          // next: value => console.log(`tap next ${name}`),
          // error: (err) => console.log(`tap error ${name}: ${err.message}`),
          // complete: () => console.log(`tap complete ${name}`),
          // unsubscribe: () => console.log(`tap unsubscribe ${name}`),
          // finalize: () => console.log(`tap finalize ${name}`),
        }),

        /*===========================================================*
        IMPORTANT
        following map operator returns request response to caller
        if it was without return, caller's response would be undefined
        alternative code style: map(response => { return response })
        */
        map(response => response),

        /*===========================================================*/

        last(), // :void return last (completed) message to caller

        catchError(this.handleError(name))
      )
  }

  commonGetRequest(name: string, url: string): Observable<any> {
    url = this.apiUrl + url;
    return this.http.get<any>(url, {
      headers: headers, observe: 'response', reportProgress: true, withCredentials: true,
    })
      .pipe(
        retry(3),
        tap({
          // subscribe: () => console.log(`tap subscribe ${name}`),
          // next: value => console.log(`tap next ${name}`),
          // error: (err) => console.log(`tap error ${name}: ${err.message}`),
          // complete: () => console.log(`tap complete ${name}`),
          // unsubscribe: () => console.log(`tap unsubscribe ${name}`),
          // finalize: () => console.log(`tap finalize ${name}`),
        }),

        /*===========================================================*
        IMPORTANT
        following map operator returns request response to caller
        if it was without return, caller's response would be undefined
        alternative code style: map(response => { return response })
        */
        map(response => response),

        /*===========================================================*/

        last(), // :void return last (completed) message to caller

        catchError(this.handleError(name))
      )
  }

}