import { Command } from '..';
import { window } from 'vscode';
import { github } from '../../github';

export class DeleteRepository implements Command {

    command: string = 'delete-repository';    
    
    async run(): Promise<void> {
        let account = github.currentAccount.login();
		let names = (await account.repos.list())!
			.data.map((r: { name: string; }) => r.name);
		
		let selection = await window.showQuickPick(names, {
			placeHolder: 'Which repository do you want to delete?'
		});

		if (selection) {
			let answer = await window.showInputBox({
				prompt: 'Type in the repository name if you are sure you want to delete it',
				placeHolder: selection
			});

			if (answer === selection) {
				account.repos.delete({
					owner: github.currentAccount.name,
					repo: selection
				}).then(() => {
					window.showInformationMessage(`Deleted repository ${selection}`);
				});
				return;
			}

			window.showErrorMessage('Delete operation aborted');
		}
    }
}