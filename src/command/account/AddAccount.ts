import { Command }              from "..";
import { AccountType, Account } from "../../auth/";
import { config } 			      	from "../../config";
import { input }                from "../../util/Input";


export class AddAccount implements Command {
	command: string = 'add-account';    

  async run(): Promise<void> {
    let user = AccountType.USER, token = AccountType.TOKEN;
    
    let type = await input.booleanChoice(user, token);
    if (type === undefined) { return; }

    let name = await input.input(
      `Please type in the ${type ? 'account user' : 'token '}name.`
    );
    if (!name) { return; }

    let key = await input.input(
      `Please type in the ${type ? 'account password' : 'token'}`
    );
    if (!key) { return; }

    config.currentAccount(name);
    config.addAccount(
      new Account(type ? user : token, name, key)
    );
  }
}