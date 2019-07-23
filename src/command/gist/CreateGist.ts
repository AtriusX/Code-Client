import { Command } from "..";
import { window, Range } from "vscode";
import { github } from "../../github";

export class CreateGist implements Command {
    command: string = 'create-gist';   
    
    async run(): Promise<void> {
        let active = window.activeTextEditor;

		if (!active) {
			window.showInformationMessage('This command can only be ran from text editors');
			return;
		}

		let type = await window.showQuickPick(['File', 'Selection']);

		
		
		let visible = await window.showQuickPick(['Public', 'Private'], {
			placeHolder: 'Account visibility'
		});
		
		let doc = active.document;
		let file = doc.fileName.split('\\');
		let data = { name: file[file.length - 1], data: '' };
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
	
		let desc = await window.showInputBox({
			prompt: 'Enter a description for your Gist'
		});

		if (data.data.trim().length === 0) {
			window.showInformationMessage('Cannot create Gist without any data');
			return;
		}

		github.currentAccount.login().gists.create({
			description: desc,
			public: visible === 'Public' ? true : false,
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