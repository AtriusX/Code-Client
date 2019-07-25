import { Command } from "..";
import { github } from "../../github";
import { input } from "../../util";
import { window } from "vscode";

export class DeleteGist implements Command {
  command: string = 'delete-gist';

  async run(): Promise<void> {
    let account = github.currentAccount.login();
    let gists   = await account.gists.list();
    if (!gists) return;

    let selection = await input.pick(
      gists.data.map(g => g.id), 'Pick a Gist to delete'
    );
    if (!selection) return;

    let confirm = await input.booleanChoice(
      'Yes', 'No', `Are you sure you want to delete ${selection}?`
    );

    if (confirm) {
      account.gists.delete({
        gist_id: selection
      }).then(() => {
        window.showInformationMessage(`Deleted Gist ${selection}`);
      });
    }
  }
}