import { Command } from "..";
import { config }  from "../../config";
import { input }   from "../../util";
import { msg }     from "../../util/Msg";

export class ChangeAccount implements Command {
  command: string = 'change-account';

  async run(): Promise<void> {
    let selection = await input.pick(
      config.getAccountNames(), 'Account name'
    );

    if (selection) {
      config.currentAccount(selection);
      msg.info(`Set active account to ${selection}`);
    }
  }
}