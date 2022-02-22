import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  private Endpoint="https://localhost:44302";
  private Apipoint="/api/form/";

  constructor(private http: HttpClient) {}

  GetLista(): Observable<any> {
    return this.http.get(this.Endpoint+this.Apipoint);
   }
   DeleteLista(id: number): Observable<any>{
    return this.http.delete(this.Endpoint+this.Apipoint+id);
  }
  PostLista(info: any): Observable<any>{
    return this.http.post(this.Endpoint+this.Apipoint, info);
  }
PutLista(id:number, info: any): Observable<any>{
  return this.http.put(this.Endpoint+this.Apipoint+id, info);

}
}
