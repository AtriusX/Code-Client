import { window }  from "vscode";
import { Command } from "..";
import { Config }  from "../../config";

export class RemoveAccount implements Command {
    command: string = 'remove-account';    
    
    async run(): Promise<void> {
		let names = Config.getAccountNames();
		if (names.length === 0) {
			window.showInformationMessage('No GitHub accounts saved');
		}
		
		window.showQuickPick(names).then(async selected => {
			if (selected) {
				Config.removeAccount(names.indexOf(selected));
				window.showInformationMessage(`Deleted '${selected}' from accounts`);
			
				// if (selected === github.currentAccount.name) {
				// 	let name = users.length !== 0 ? users[0].name : '';
				// 	window.showInformationMessage(name === '' ? 'Removed active account' : `Set active account to ${name}`);
				// 	await github.setCurrentAccount(name);
				// }
			}
		});
    }
}