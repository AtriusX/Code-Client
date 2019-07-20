import    { window, commands, ExtensionContext, workspace }  from 'vscode';
import    { github } 							  			 from './github';
import * as OctoKit 							  			 from '@octokit/rest';
import { Account, AccountType } from './Account';
let cli: OctoKit;

export function activate(context: ExtensionContext) {
	// Extension configuration
	const config = workspace.getConfiguration('code-client', null);
	// Initialize commands
	install(context, 'add-user', async () => {
		let type, name, key;
		let user = AccountType.USER, token = AccountType.TOKEN;
		await window.showQuickPick([user, token]).then(async value => {
			if (value === user || token) {
				let isuser = value === user;
				type = value;
				name = await window.showInputBox({
					prompt: 'Please type in ' + (isuser ? 'the account username.' : ' the display name for the token.')
				});

				key = await window.showInputBox({
					prompt: 'Please type in ' + (isuser ? 'the account password.' : 'the token.'),
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
		
		if (users.length === 0) {
			window.showInformationMessage('No GitHub accounts saved');
		}
		var names: string[] = users.map(a => a.name);
		window.showQuickPick(names).then(selected => {
			if (selected) {
				users.splice(names.indexOf(selected!), 1);
				config.update('users', users);
				window.showInformationMessage(`Deleted '${selected}' from accounts`);
			}
		});
	});

	install(context, 'change-user', () => {

	});

	install(context, 'edit-user', () => {

	});

	install(context, 'create', async () => {
		// let input = await window.showInputBox();
		// commands.executeCommand('git.clone', input);
		// window.showInformationMessage(input!);
	}, true);
}

export function deactivate() {}

async function install(
	context: ExtensionContext, 
	name: string, 
	command: () => any, 
	requireAuth = false
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