import { Account }   from '../auth';
import { workspace } from "vscode";

export namespace config {
  const config = workspace.getConfiguration('managit', null);

  export function getAccounts(): Account[] {
    return config.get('users', []); 
  }

  export function getAccountNames(): Array<string> {
    return getAccounts().map(a => a.name);
  }

  export function getAccount(val: string | number): Account | null {
    let accounts = getAccounts();
    // Index retreival
    if (typeof(val) === "number") {
      return accounts[val];
    }
    // Name retreival
    for (let a of accounts) {
      if (a.name === val) { return a; }
    }
    // No account found
    return null;
  }

  export function addAccount(account: Account) {
    let accounts = getAccounts();
    accounts.push(account);
    config.update('users', accounts);
  }

  export function removeAccount(account: Account | number) {
    let accounts = getAccounts();
    accounts.splice(
      typeof(account) === "number" ? account : accounts.indexOf(account), 1
    );
    config.update('users', accounts);
  }

  export function updateAccount(account: Account, index: number) {
    let accounts    = getAccounts();
    accounts[index] = account;
    config.update('users', accounts);
  }

  export function currentAccount(
    name: string | number | undefined = undefined
  ): Account | null {
    // Return the existing current account
    if (name === undefined) {
      return getAccount(config.get('current-account', ''));
    }
    // Replace the existing account with a new one
    config.update('current-account', name);
    return getAccount(name);
  }
}