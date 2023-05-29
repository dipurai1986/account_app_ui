import { Component } from '@angular/core';
import { AccountService } from './Services/Account.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accounts: any[] = [];
  accountId: number = 0;
  userAccountNo:string="";
  amount: number = 0;
  errorMessage: string = '';
  successMessage:string='';
  transactionType: string = '';
  userid:number=100;
  initialamount:number=100;
  isinitialamountValid:boolean=true

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.getAccounts(this.userid); 

  
  }

  getAccounts(userId: number): void {
    this.accountService.getAccounts(userId)
      .subscribe(
        response => {
          this.accounts = response;
        },
        error => {
          this.errorMessage = 'Error fetching accounts.';
        }
      );
  }

  createAccount(): void {
    if(this.initialamount<100){
      this.isinitialamountValid=false;
      return;
    }
    this.accountService.createAccount(this.userid,this.initialamount) 
      .subscribe(
        response => {
        
          this.getAccounts(this.userid); 
        },
        error => {
          this.errorMessage = 'Error in creating account.';
        }
      );
  }

  deposit(account: any): void {
    this.transactionType = 'Deposit';
    this.userAccountNo=account.accountNumber
    this.amount=0;
    this.accountId=account.accountId
  }

  withdraw(account: any): void {
    this.transactionType = 'Withdraw';

    this.userAccountNo=account.accountNumber
    this.accountId=account.accountId
  }

  deleteAccount(account: any): void {
    const userId = this.userid; 
    const accountId = account.accountId;
    this.accountService.deleteAccount(userId, accountId)
      .subscribe(
        response => {
          
          this.getAccounts(this.userid); 
          this.successMessage="Account Deleted Successfuly";
        },
        error => {
          this.errorMessage = 'Error deleting account.';
        }
      );
  }

  submitTransaction(): void {
    // Implement the logic for deposit or withdrawal based on transactionType
    const userId = this.userid; // Pass the user ID as an argument
    const accountId = this.accountId;
    const amount = this.amount;

    if (this.transactionType === 'Deposit') {
      this.accountService.deposit(userId, accountId, amount)
        .subscribe(
          response => {
            this.errorMessage="";
            this.getAccounts(this.userid); 
            this.successMessage="Deposit Successfuly";
            this.amount=0;
          },
          error => {
            this.handleError(error);
          }
        );
    } else if (this.transactionType === 'Withdraw') {
      this.accountService.withdraw(userId, accountId, amount)
        .subscribe(
          response => {
            this.errorMessage="";
            this.getAccounts(this.userid); 
            this.successMessage="withdraw Successfuly";
            this.amount=0;
          },
          error => {
            this.handleError(error);
           
          }
        );
    }
  }
  private handleError(error: HttpErrorResponse) {
    this.errorMessage = 'An error occurred';
    this.successMessage='';
    var errorList="";
  
      if (error.error && error.error.errors) {
        errorList = error.error.errors[''];
        if(!Array.isArray(errorList)){
          errorList= error.error.errors.Amount;
        }
        if (Array.isArray(errorList) && errorList.length > 0) {
          this.errorMessage = errorList[0];
        }
      }
    

   
  }
}
