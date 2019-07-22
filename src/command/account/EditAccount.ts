import { Command } from "..";
import { Account, AccountType } from "../../Account";
import { window, workspace } from "vscode";

const config = workspace.getConfiguration('managit', null);

export class EditAccount implements Command {
    
    command: string = 'edit-account';
    
    async run(): Promise<void> {
        let users: Array<Account> = config.get('users', []);
		let names: string[]		  = this.accountNames(users);

		let selection = await window.showQuickPick(names);

		if (selection) {
			let index = names.indexOf(selection);
			let account = users[index];
			let item = await window.showQuickPick(
				account.type === AccountType.USER ? ['Username', 'Password'] : ['Name', 'Token']
			);
			
			if (!item) {
				return;
			}

			if (item === 'Username' || 'Name') {
				let name = await window.showInputBox({
					prompt: `Enter the new ${item.toLowerCase()} for the account`
				});

				if (name) {
					account.name = name!;
				}
			}

			else if (item === 'Password' || 'Token') {
				let key = await window.showInputBox({
					prompt: `Enter the new ${item.toLowerCase()} for the account`,
					password: true
				});

				if (key) {
					account.key = key;
				}
			}
			// Update user account
			users[index] = account;
			config.update('users', users);
			window.showInformationMessage(`Updated account data for ${selection}`);
		}
    }    
    
    private accountNames(accounts: Array<Account>): string[] {
        return accounts.map(a => a.name);
    }
}