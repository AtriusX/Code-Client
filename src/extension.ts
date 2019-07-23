import { 
	Commands, 
	AddAccount, 
	EditAccount, 
	ChangeAccount, 
	RemoveAccount, 
	CreateRepository, 
	DeleteRepository, 
	CreateGist,
	DeleteGist
} from './command/';
// import { AddAccount, EditAccount, ChangeAccount, RemoveAccount } from './command/account';
import { ExtensionContext } from 'vscode';

export function activate(context: ExtensionContext) {
	// Initialize commands
	Commands.register(context,
		new AddAccount(),
		new EditAccount(),
		new ChangeAccount(),
		new RemoveAccount(),
		new CreateRepository(),
		new DeleteRepository(),
		new CreateGist(),
		new DeleteGist()
	);
}

// export function deactivate() {}