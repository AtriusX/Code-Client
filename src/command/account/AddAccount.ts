import { Command }              from "..";
import { AccountType, Account } from "../../auth/";
import { Config } 				from "../../config";
import { Input } from "../../util/Input";


export class AddAccount implements Command {
	command: string = 'add-account';    

    async run(): Promise<void> {
        let user = AccountType.USER, token = AccountType.TOKEN;
		let type = await Input.booleanChoice(user, token, 'User Type');
		// 
		if (type === undefined) {
			return;
		}
		
		let [name, key] = await Input.sequence([
			{
				type: 'text',
				text: `Please type in the ${type ? 'account user' : 'token '}name.`
			},
			{
				type: 'pass',
				text: `Please type in the ${type ? 'account password' : 'token'}`,
			}
		]) as string[];
		
		if (name && key) {
			Config.currentAccount(name);
			Config.addAccount(
				new Account(type ? user : token, name, key)
			);
		}
    }
}