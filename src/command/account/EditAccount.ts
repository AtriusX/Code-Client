import { Command } from "..";
import { Account, AccountType } from "../../auth/";
import { window } from "vscode";
import { Config } from "../../config";

export class EditAccount implements Command {    
    command: string = 'edit-account';

    async run(): Promise<void> {
		let names = Config.getAccountNames();
		let selection = await window.showQuickPick(names);

		if (selection) {
			let index = names.indexOf(selection);
			let account = Config.getAccount(index);

			if (!account) {
				return;
			}

			let item = await window.showQuickPick(
				account.type === AccountType.USER ? ['Username', 'Password'] : ['Name', 'Token']
			);
			
			if (!item) {
				return;
			}

			if (['Username', 'Name'].includes(item)) {
				let name = await window.showInputBox({
					prompt: `Enter the new ${item.toLowerCase()} for the account`
				});
				
				if (name) {
					account.name = name!;
				}
			}

			else if (['Password', 'Token'].includes(item)) {
				let key = await window.showInputBox({
					prompt: `Enter the new ${item.toLowerCase()} for the account`,
					password: true
				});

				if (key) {
					account.key = key;
				}
			}
			// Update user account
			Config.updateAccount(account, index);
			window.showInformationMessage(`Updated account data for ${selection}`);
		}
    }    
}