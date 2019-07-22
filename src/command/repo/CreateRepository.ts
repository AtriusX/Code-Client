import { Command } from '..';
import { github } from '../../github';
import { window, commands } from 'vscode';


export class CreateRepository implements Command {
    command: string = 'create-repository';    
    
    async run(): Promise<void> {
        let account = github.currentAccount.login();
		// Get repository properties
		let name = await window.showInputBox({
			prompt: 'Type in the name of your repository'
		});
		let desc = await window.showInputBox({
			prompt: 'Type in the description for your repository'
		});
		let repoPrivate = await window.showQuickPick(['Yes', 'No'], {
			placeHolder: 'Make repository private?'
		}).then(selected => {
			return selected === 'Yes' ? true : false;
		});
		let init = await window.showQuickPick(['Yes', 'No'], {
			placeHolder: 'Auto initialize?'
		}).then(selected => {
			return selected === 'Yes' ? true : false;
		});
		// Name is the only required property
		if (!name) {
			return;
		}

		account.repos.createForAuthenticatedUser({
			name: name, description: desc,
			private: repoPrivate, auto_init: init
		}).then((result) => { 
			window.showInformationMessage(`Created repository '${name}'`, 'Clone').then(() => {
				commands.executeCommand('git.clone', result.data.url).then(() => {
					window.showInformationMessage('Repository cloned');
				});
			});
		});
		// TODO auto clone repository and open it
    }
}