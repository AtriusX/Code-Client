import    { window, commands, ExtensionContext, workspace }  from 'vscode';
import    { github } 							  			 from './github';
import * as OctoKit 							  			 from '@octokit/rest';
import    { Account, AccountType } 							 from './Account';
					
let cli: OctoKit;

// Extension configuration
const config = workspace.getConfiguration('code-client', null);

export function activate(context: ExtensionContext) {
	// Initialize commands
	install(context, 'add-user', async () => {
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
	});

	install(context, 'remove-user', async () => {
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
	});

	install(context, 'change-user', async () => {
		let selection = await selectName();

		if (selection) {
			github.setCurrentAccount(selection);
			window.showInformationMessage(`Set active account to ${selection}`);
		}
	});

	install(context, 'edit-user', async () => {
		let users: Array<Account> = config.get('users', []);
		let names: string[]		  = accountNames(users);

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
			window.showInformationMessage(`Updated account data for ${selection}`)
		}
	});

	install(context, 'create', async () => {
		let account = github.currentAccount.login();
		let name = await window.showInputBox({
			prompt: 'Type in the name of your repository'
		});
		let desc = await window.showInputBox({
			prompt: 'Type in the description for your repository'
		});
		let init = await window.showQuickPick(['Yes', 'No'], {
			placeHolder: 'Auto initialize?'
		}).then(selected => {
			return selected === 'Yes' ? true : false;
		});

		if (!name) {
			return;
		}

		account.repos.createForAuthenticatedUser({
			name: name, 
			description: desc,
			auto_init: init
		}).then(() => { 
			window.showInformationMessage(`Created repository '${name}'`);
		});
		// TODO auto clone repository and open it
	}, true);
}

export function deactivate() {}

async function install(
	context: ExtensionContext, 
	name: string, 
	command: () => any, 
	requireAuth: boolean = false
) {
	let cmd = commands.registerCommand('code-client.' + name, 
		requireAuth ? () => {
			cli = github.authenticate();
			if (cli !== undefined) {
				command();
			}
		} : command
	);
	context.subscriptions.push(cmd);
}

function accountNames(accounts: Array<Account>): string[] {
	return accounts.map(a => a.name);
}

async function selectName(): Promise<string | undefined> {
	let users: Array<Account> = config.get('users', []);
	let names: string[] 	  = accountNames(users);
	return await window.showQuickPick(names);
}