import { window }  from "vscode";
import { Command } from "..";
import { config }  from "../../config";
import { input }   from "../../util";

export class RemoveAccount implements Command {
  command: string = 'remove-account';    
    
  async run(): Promise<void> {
		let names = config.getAccountNames();
		if (!names.length) {
			window.showInformationMessage('No GitHub accounts saved');
		}
		
		let selection = await input.pick(
			names, 'Pick an account to remove'
		);
		
		if (selection) {
			config.removeAccount(names.indexOf(selection));
			window.showInformationMessage(`Deleted '${selection}' from accounts`);
		}
		// if (selected === github.currentAccount.name) {
		// 	let name = users.length !== 0 ? users[0].name : '';
		// 	window.showInformationMessage(name === '' ? 'Removed active account' : `Set active account to ${name}`);
		// 	await github.setCurrentAccount(name);
		// }
  }
}