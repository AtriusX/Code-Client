import { Command } 	   from "..";
import { AccountType } from "../../auth/";
import { window } 	   from "vscode";
import { Config } 	   from "../../config";
import { Input } 	   from "../../util";

export class EditAccount implements Command {    
    command: string = 'edit-account';

    async run(): Promise<void> {
		let names = Config.getAccountNames();
		let selection = await Input.pick(
			names, 'Pick an account'
		);

		let account = Config.getAccount(selection!);
		if (!account) {
			return;
		}

		let item = await Input.pick(account.type === AccountType.USER ?
			['Username', 'Password'] : ['Name', 'Token'], 'Pick a field to edit'
		);
		
		if (!item) {
			return;
		}

		let isToken = ['Password', 'Token'].includes(item);
		let val = await Input.input(
			`Enter the new ${item.toLowerCase()} for the account`
		);

		if (val) {
			isToken ? account.key = val : account.name = val;
		}
		// Update user account
		Config.updateAccount(account, names.indexOf(account.name));
		window.showInformationMessage(`Updated account data for ${selection}`);
    }    
}