import { Command } from '..';
import { window }  from 'vscode';
import { github }  from '../../github';
import { input }   from '../../util';

export class DeleteRepository implements Command {
  command: string = 'delete-repository';

  async run(): Promise<void> {
    let account = github.currentAccount.login();
    let repos   = (await account.repos.list());
    if (!repos) return;
    
    let names = repos.data.map(
      (r: { name: string; }) => r.name
    );
      
    let selection = await input.pick(names, 'Which repository do you want to delete?');
    if (!selection) return;

    let answer = await window.showInputBox({
      prompt: 'Type in the repository name if you are sure you want to delete it',
      placeHolder: selection
    });

    if (answer !== selection.toLowerCase()) {
      window.showErrorMessage('Delete operation aborted');
      return;
    }

    account.repos.delete({
      owner: github.currentAccount.name,
      repo: selection
    }).then(() => {
      window.showInformationMessage(`Deleted repository ${selection}`);
    });
  }
}