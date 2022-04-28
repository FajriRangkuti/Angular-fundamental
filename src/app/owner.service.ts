import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Owner } from './owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private apiBaseUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  public getOwner(): Observable<Owner[]>{    
    return this.http.get<Owner[]>(`${this.apiBaseUrl}/parkingowner`);
  }
}
