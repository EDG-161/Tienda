import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = 'https://api.airtable.com/v0/appLPwJLaFq3JZ06i/';
  private headers = new HttpHeaders({
    Authorization: 'Bearer keykzfBdKWuHDhJoU'
  });
  constructor(private httpClient: HttpClient) {
  }

  processData(data) {
    return data.records;
  }

  processError(error) {
    return throwError('Algo paso', error);
  }

  public get(base) {
    return this.httpClient.get(this.SERVER_URL + base + '?api_key=keykzfBdKWuHDhJoU').pipe(
        map((data: any[]) => {
          return this.processData(data);
        }), catchError( error => {
          return this.processError(error);
        })
    );
  }

  public getBaseData(base) {
    return this.httpClient.get(this.SERVER_URL + base + '?api_key=keykzfBdKWuHDhJoU').pipe(
      map((data: any[]) => {
        return this.processData(data);
      }), catchError( error => {
        return this.processError(error);
      })
    ).toPromise();
  }

  public getInfo(base) {
    return this.httpClient.get(this.SERVER_URL + base + '?api_key=keykzfBdKWuHDhJoU').pipe(
      map((data: any[]) => {
        return this.processData(data);
      }), catchError( error => {
        return this.processError(error);
      })
    ).toPromise();
  }

  public getFullInfo(base, params = '') {
    return this.httpClient.get(this.SERVER_URL + base + '?api_key=keykzfBdKWuHDhJoU' + params).pipe(
      map((data: any[]) => {
        return data;
      }), catchError( error => {
        return this.processError(error);
      })
    ).toPromise();
  }
}
