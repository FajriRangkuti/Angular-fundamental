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

  public uploadPDF(file):Observable<any>{
    const formData = new FormData();

    formData.append("file",file, file.name);
    console.log(file.name);

    return this.http.post(`${this.apiBaseUrl}/upload/logo`,formData);
  }

  public modifyPDF(file,name,address,id){
    return this.http.get(`${this.apiBaseUrl}/modify/${file.name}/export?name=${name}&address=${address}&id=${id}`);
  }

}
