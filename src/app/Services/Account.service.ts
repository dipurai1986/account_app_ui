import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'https://localhost:7165'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAccounts(userId: number): Observable<any> {
    const url = `${this.apiUrl}/api/Account/GetAccounts/${userId}`;
    return this.http.get<any>(url);
  }

  createAccount(userId: number,initial_balance:number) {
    const headers = new HttpHeaders()

   const url = `${this.apiUrl}/api/Account/CreateAccount`; 
    const body = {
      userId: userId,
      initial_balance:initial_balance
    };

    return this.http.post(url, body, { headers });
  
  }

  deposit(userId: number, accountId: number, amount: number): Observable<any> {
    const url = `${this.apiUrl}/api/Transaction/Deposit`;
    const body = { userId, accountId, amount };
    return this.http.post<any>(url, body);
  }

  withdraw(userId: number, accountId: number, amount: number): Observable<any> {
    const url = `${this.apiUrl}/api/Transaction/Withdraw`;
    const body = { userId, accountId, amount };
    return this.http.post<any>(url, body);
  }

  deleteAccount(userId: number, accountId: number): Observable<any> {
    const url = `${this.apiUrl}/api/Account/DeleteAccount/${userId}/${accountId}`;
    return this.http.delete<any>(url);
  }
}
