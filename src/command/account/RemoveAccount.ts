import { window }  from "vscode";
import { Command } from "..";
import { Config }  from "../../config";
import { Input }   from "../../util";

export class RemoveAccount implements Command {
    command: string = 'remove-account';    
    
    async run(): Promise<void> {
		let names = Config.getAccountNames();
		if (!names.length) {
			window.showInformationMessage('No GitHub accounts saved');
		}
		
		let selection = await Input.pick(
			names, 'Pick an account to remove'
		);
		
		if (selection) {
			Config.removeAccount(names.indexOf(selection));
			window.showInformationMessage(`Deleted '${selection}' from accounts`);
		}
		// if (selected === github.currentAccount.name) {
		// 	let name = users.length !== 0 ? users[0].name : '';
		// 	window.showInformationMessage(name === '' ? 'Removed active account' : `Set active account to ${name}`);
		// 	await github.setCurrentAccount(name);
		// }
    }
}