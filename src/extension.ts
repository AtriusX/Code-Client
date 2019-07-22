import    { ExtensionContext, workspace } from 'vscode';
import * as OctoKit 					  from '@octokit/rest';
import { 
	CommandManager, 
	AddAccount, 
	ChangeAccount,
	EditAccount,
	RemoveAccount,
	CreateRepository,
	DeleteRepository,
	CreateGist 
} from './command';

export function activate(context: ExtensionContext) {
	// Initialize commands
	let manager = CommandManager.getInstance(context);

	manager.register(
		new AddAccount(),
		new EditAccount(),
		new ChangeAccount(),
		new RemoveAccount(),
		new CreateRepository(),
		new DeleteRepository(),
		new CreateGist()
	);
}

// export function deactivate() {}