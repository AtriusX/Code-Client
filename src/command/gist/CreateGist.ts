import { Command }       from "..";
import { window, Range } from "vscode";
import { github }        from "../../github";
import { input }         from "../../util";

export class CreateGist implements Command {
    command: string = 'create-gist';   
    
    async run(): Promise<void> {
    let active = window.activeTextEditor;
    if (!active) {
      window.showInformationMessage('This command can only be ran from text editors');
      return;
    }

    let type = await input.booleanChoice('File', 'Selection');
    if (type === undefined) return;

    let visible = await input.booleanChoice('Public', 'Private', 'Account visibility');
    if (visible === undefined) return;

    let doc   = active.document, sel = active.selection;
    let range = type ? undefined : new Range(sel.start, sel.end); 
    let data  = { 
      name: doc.fileName.split('\\').pop(), data: doc.getText(range).trim()
    };

    if (!data.data.length) {
      window.showInformationMessage('Cannot create Gist without any data');
      return;
    }

    let desc = await input.input('Enter a description for your Gist');
    if (desc === undefined) return;
    
    github.currentAccount.login().gists.create({
      description: desc,
      public: visible,
      files: {
        [data.name!]: {
          content: data.data
        }
      }
    }).then(() => {
      window.showInformationMessage(`Created Gist '${data.name}'`);
    });
  }
}
