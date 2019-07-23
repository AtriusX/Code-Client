import { Command } from "..";
import { Account } from "../../Account";
import { window, workspace } from "vscode";
import { github } from "../../github";

const config = workspace.getConfiguration('managit', null);

export class RemoveAccount implements Command {
    command: string = 'remove-account';    
    
    async run(): Promise<void> {
        let users: Array<Account> = config.get('users', []);
		let names: string[] 	  = accountNames(users);
		
		if (names.length === 0) {
			window.showInformationMessage('No GitHub accounts saved');
		}

		window.showQuickPick(names).then(async selected => {
			if (selected) {
				users.splice(names.indexOf(selected!), 1);
				config.update('users', users);
				window.showInformationMessage(`Deleted '${selected}' from accounts`);
			
				if (selected === github.currentAccount.name) {
					let name = users.length !== 0 ? users[0].name : '';
					window.showInformationMessage(name === '' ? 'Removed active account' : `Set active account to ${name}`);
					await github.setCurrentAccount(name);
				}
			}
		});
    }
}

function accountNames(accounts: Array<Account>): string[] {
    return accounts.map(a => a.name);
}