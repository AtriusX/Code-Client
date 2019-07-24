import { window }  from "vscode";
import { Command } from "..";
import { Config }  from "../../config";
import { Input }   from "../../util";

export class ChangeAccount implements Command {
  command: string = 'change-account';

  async run(): Promise<void> {
    let selection = await Input.pick(
      Config.getAccountNames(), 'Account name'
    );

    if (selection) {
      Config.currentAccount(selection);
      window.showInformationMessage(`Set active account to ${selection}`);
    }
  }
}