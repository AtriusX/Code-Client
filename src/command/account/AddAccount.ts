import { Command }              from "..";
import { AccountType, Account } from "../../auth/";
import { Config } 				from "../../config";
import { Input } from "../../util/Input";


export class AddAccount implements Command {
	command: string = 'add-account';    

  async run(): Promise<void> {
    let user = AccountType.USER, token = AccountType.TOKEN;
    // 
    let isuser, [type, name, key] = await Input.sequence([
      {
        type: 'bool',
        text: 'User Type',
        inputs: [user, token],
        action: res => isuser = res
      },
      {
        type: 'text',
        text: `Please type in the ${isuser ? 'account user' : 'token '}name.`
      },
      {
        type: 'pass',
        text: `Please type in the ${isuser ? 'account password' : 'token'}`,
      }
    ]);
    
    if (name && key) {
      Config.currentAccount(name);
      Config.addAccount(
        new Account(type ? user : token, name, key)
      );
    }
  }
}