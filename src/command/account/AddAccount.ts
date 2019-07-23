import { Command }              from "..";
import { AccountType, Account } from "../../auth/";
import { Config } 				from "../../config";
import { Input }				from "../../util";

export class AddAccount implements Command {
	command: string = 'add-account';    

    async run(): Promise<void> {
        let user = AccountType.USER, token = AccountType.TOKEN;
		let type = await Input.booleanChoice(
			user, token, 'User Type'
		);
		
		let isuser = type === true;

		let name = await Input.input(
			`Please type in the ${isuser ? 'account username.' : 'token name.'}`, type !== undefined
		);

		let key = await Input.input(
			`Please type in the ${isuser ? 'account password.' : 'token.'}`, name, true
		);

		if (type && name && key) {
			Config.addAccount(
				new Account(isuser ? user : token, name, key)
			);
		}
    }
}