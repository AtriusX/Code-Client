import { Command } from "..";
import { github }  from "../../github";
import { window, workspace }  from "vscode";
import { Account } from "../../Account";

const config = workspace.getConfiguration('managit', null);

export class ChangeAccount implements Command {
    command: string = 'change-account';

    async run(): Promise<void> {
        let selection = await selectName();

		if (selection) {
			github.setCurrentAccount(selection);
			window.showInformationMessage(`Set active account to ${selection}`);
		}
    }
}

async function selectName(): Promise<string | undefined> {
    let users: Array<Account> = config.get('users', []);
    let names: string[] 	  = accountNames(users);
    return await window.showQuickPick(names);
}

function accountNames(accounts: Array<Account>): string[] {
    return accounts.map(a => a.name);
}