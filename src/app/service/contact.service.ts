import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponse } from '../shared/models/messageResponse';
import { ContactRequest } from '../shared/models/contactRequest';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contact';

  constructor(private http: HttpClient) { }

  public sendEmail(contactRequest: ContactRequest): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(this.apiUrl, contactRequest)
  }
}
