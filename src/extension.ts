import { ExtensionContext } from 'vscode';
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