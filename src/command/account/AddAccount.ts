import { Command }              from "..";
import { AccountType, Account } from "../../auth/";
import { Config } 				from "../../config";
import { Input } from "../../util/Input";


export class AddAccount implements Command {
	command: string = 'add-account';    

  async run(): Promise<void> {
    let user = AccountType.USER, token = AccountType.TOKEN;
    
    let type = await Input.booleanChoice(user, token);
    if (type === undefined) { return; }

    let name = await Input.input(
      `Please type in the ${type ? 'account user' : 'token '}name.`
    );
    if (!name) { return; }

    let key = await Input.input(
      `Please type in the ${type ? 'account password' : 'token'}`
    );
    if (!key) { return; }

    Config.currentAccount(name);
    Config.addAccount(
      new Account(type ? user : token, name, key)
    );
  }
}