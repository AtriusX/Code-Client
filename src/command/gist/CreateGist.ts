import { Command } from "..";
import { window, Range } from "vscode";
import { github } from "../../github";
import { Config } from "../../config";
import { Input } from "../../util";

export class CreateGist implements Command {
    command: string = 'create-gist';   
    
    async run(): Promise<void> {
    if (!window.activeTextEditor) {
      window.showInformationMessage('This command can only be ran from text editors');
      return;
    }

    let active = window.activeTextEditor;
    let data: { name: string, data: string };
    let [type, visible, desc] = await Input.sequence([
      {
        type: 'pick',
        inputs: ['File', 'Selection'],
      },
      {
        type: 'pick',
        text: 'Account visibility',
        inputs: ['Public', 'Private'],
        action: () => {
          let doc = active.document;
          let file = doc.fileName.split('\\');
          data = { name: file[file.length - 1], data: '' };
          switch (type) {
            case 'File':
              data.data = doc.getText();
              break;
            case 'Selection':
              let sel = active.selection;
              let range = new Range(sel.start, sel.end);
              data.data = doc.getText(range);
              break;
          }
        }
      },
      {
        type: 'text',
        text: 'Enter a description for your Gist',
        action: () => {
          if (data.data.trim().length === 0) {
            window.showInformationMessage('Cannot create Gist without any data');
            return;
          }

          Config.currentAccount()!.login().gists.create({
            description: desc,
            public: visible === 'Public' ? true : false,
            files: {
              [data.name]: {
                content: data.data
              }
            }
          }).then(() => {
            window.showInformationMessage(`Created Gist '${data.name}'`);
          });
        }
      }
    ]);
  }
}