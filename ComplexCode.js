/*
Filename: ComplexCode.js
Description: This code implements a complex banking system with multiple user accounts, transactions, and balance management.

Disclaimer: This code is for illustrative purposes only. It is not intended to be used in a real-world scenario, as it is a simplistic representation of a banking system.

Please execute this code snippet for better comprehension.
*/

class Bank {
  constructor() {
    this.accounts = {};
    this.transactions = [];
  }

  createAccount(accountNumber, initialBalance) {
    if (!this.accounts[accountNumber]) {
      this.accounts[accountNumber] = initialBalance;
      console.log(`Account ${accountNumber} created with an initial balance of $${initialBalance}`);
    } else {
      console.log(`Account ${accountNumber} already exists!`);
    }
  }

  deposit(accountNumber, amount) {
    if (this.accounts[accountNumber]) {
      this.accounts[accountNumber] += amount;
      console.log(`$${amount} deposited to account ${accountNumber}, current balance: $${this.accounts[accountNumber]}`);
    } else {
      console.log(`Account ${accountNumber} does not exist!`);
    }
  }

  withdraw(accountNumber, amount) {
    if (this.accounts[accountNumber]) {
      if (this.accounts[accountNumber] >= amount) {
        this.accounts[accountNumber] -= amount;
        console.log(`$${amount} withdrawn from account ${accountNumber}, current balance: $${this.accounts[accountNumber]}`);
      } else {
        console.log(`Insufficient balance in account ${accountNumber}`);
      }
    } else {
      console.log(`Account ${accountNumber} does not exist!`);
    }
  }

  transfer(senderAccount, receiverAccount, amount) {
    if (this.accounts[senderAccount] && this.accounts[receiverAccount]) {
      if (this.accounts[senderAccount] >= amount) {
        this.accounts[senderAccount] -= amount;
        this.accounts[receiverAccount] += amount;
        console.log(`$${amount} transferred from account ${senderAccount} to account ${receiverAccount}`);
        console.log(`Sender's balance: $${this.accounts[senderAccount]}`);
        console.log(`Receiver's balance: $${this.accounts[receiverAccount]}`);
      } else {
        console.log(`Insufficient balance in account ${senderAccount}`);
      }
    } else {
      console.log(`One or both accounts do not exist!`);
    }
  }

  getBalance(accountNumber) {
    if (this.accounts[accountNumber]) {
      console.log(`Account ${accountNumber} balance: $${this.accounts[accountNumber]}`);
    } else {
      console.log(`Account ${accountNumber} does not exist!`);
    }
  }

  printTransactions() {
    console.log("Transaction History:");
    this.transactions.forEach((transaction, index) => {
      console.log(`Transaction ${index + 1}: ${transaction}`);
    });
  }
}

// Bank initialization
const bank = new Bank();

// Example usage
bank.createAccount("A001", 5000);
bank.createAccount("B002", 2000);

bank.deposit("A001", 1000);
bank.withdraw("B002", 500);
bank.deposit("C003", 3000); // Non-existent account

bank.transfer("A001", "B002", 700);
bank.transfer("B002", "C003", 500); // Non-existent accounts

bank.withdraw("B002", 3500); // Insufficient Balance
bank.transfer("A001", "B002", 6000); // Insufficient Balance

bank.getBalance("A001");
bank.getBalance("B002");
bank.getBalance("C003"); // Non-existent account

bank.printTransactions();
