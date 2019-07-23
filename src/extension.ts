import { 
	CommandManager, 
	AddAccount, 
	EditAccount, 
	ChangeAccount, 
	RemoveAccount, 
	CreateRepository, 
	DeleteRepository, 
	CreateGist
} from './command/';
// import { AddAccount, EditAccount, ChangeAccount, RemoveAccount } from './command/account';
import { ExtensionContext, commands } from 'vscode';

export function activate(context: ExtensionContext) {
	// Initialize commands
	CommandManager.register(context,
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