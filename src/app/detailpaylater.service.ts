import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { paylaterDetail } from './paylater';

@Injectable({
  providedIn: 'root'
})
export class DetailpaylaterService {

  private apiBaseUrl = environment.apiBaseUrl

  constructor(private http:HttpClient) { }

  public getOwner(): Observable<paylaterDetail[]>{
    return this.http.get<paylaterDetail[]>(`${this.apiBaseUrl}/paylater/all`);
  }

  public getPaylater(id:String): Observable<paylaterDetail>{
    return this.http.get<paylaterDetail>(`${this.apiBaseUrl}/paylater?id=${id}`);
  }

  public generatePDF(id:String,logoName:String): Observable<void>{
    return this.http.get<void>(`${this.apiBaseUrl}/paylater/${id}/mandiri_logo.png/export`)
  }
}
