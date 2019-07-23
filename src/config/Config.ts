import { Account } from '../auth';
import { workspace } from "vscode";

export namespace Config {
    const config = workspace.getConfiguration('managit');

    export function getAccounts(): Array<Account> {
        return config.get('users', []); 
    }

    export function getAccountNames(): Array<string> {
        return getAccounts().map(a => a.name);
    }

    export function getAccount(val: string | number): Account | null {
        let accounts = getAccounts();
        // Index retreival
        if (typeof(val) === "number") {
            return accounts[val as number];
        }
        // Name retreival
        accounts.forEach(a => {
            if (a.name === val) {
                return a;
            }
        });
        return null;
    }

    export function addAccount(account: Account) {
        config.update('users', getAccounts().push(account));
    }

    export function removeAccount(account: Account | number) {
        let accounts = getAccounts();
        config.update('users', accounts.splice(
            typeof(account) === "number" ? account : accounts.indexOf(account), 1
        ));
    }

    export function updateAccount(account: Account, index: number) {
        config.update('users', getAccounts()[index] = account);
    }

    export function currentAccount(name: string | number | undefined): Account | null {
        // Return the existing current account
        if (name === undefined) {
            return getAccount(config.get('current-account', ''));
        }
        // Replace the existing account with a new one
        let account = getAccount(name);
        config.update('current-account', account);
        return account;
    }
}