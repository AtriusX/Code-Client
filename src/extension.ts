import    { window, commands, ExtensionContext }  from 'vscode';
import    { github } 							  from './github';
import * as OctoKit 							  from '@octokit/rest';

let cli: OctoKit | undefined;

export function activate(context: ExtensionContext) {
	cli  = github.authenticate();
	// Initialize commands
	install(context, 'extension.create', async () => {
		// let input = await window.showInputBox();
		// commands.executeCommand('git.clone', input);
		// window.showInformationMessage(input!);
	}, true);
}

export function deactivate() {}

async function install(
	context: ExtensionContext, 
	name: string, 
	command: () => any, 
	requireAuth = false
) {
	let cmd = commands.registerCommand(name, 
		requireAuth ? () => {
			cli = github.authenticate();
			if (cli !== undefined) {
				command();
			}
		} : command
	);
	context.subscriptions.push(cmd);
}