import { Command }              from "..";
import { window, workspace } 	from "vscode";
import { AccountType, Account } from "../../Account";

const config = workspace.getConfiguration('managit', null);

export class AddAccount implements Command {

    command: string = 'add-account';    
    
    async run(): Promise<void> {
        let type, name, key;
		let user = AccountType.USER, token = AccountType.TOKEN;
		await window.showQuickPick([user, token]).then(async value => {
			if (value === user || token) {
				let isuser = value === user;
				type = value;
				name = await window.showInputBox({
					prompt: 'Please type in the ' + (isuser ? 'account username.' : 'token display name.')
				});
				

				key = await window.showInputBox({
					prompt: 'Please type in the ' + (isuser ? 'account password.' : 'token.'),
					password: true
				});
			}
		});

		if (type && name && key) {
			const users: Array<Account> = config.get('users', []);
			users.push(new Account(type, name, key));
			config.update('users', users);
		} else {
			console.log('Creation aborted');
		}
    }
}