import    { Account }           from './Account';
import    { window, workspace } from 'vscode';
import * as OctoKit             from '@octokit/rest';

export namespace github {
    const config = workspace.getConfiguration('code-client');
    export let currentAccount: Account;

    export async function setCurrentAccount(name: string) {
        let users: Array<Account> = config.get('users', []);
        let names: string[] = users.map(a => a.name);
        currentAccount = users[names.indexOf(name)];
        await config.update('active-account', name);
    }

    /**
     * * Attempts to authenticate the user's credentials
     */
    export function authenticate(): OctoKit {
        // Check for user credentials
        let username = '', 
            password = '';

        if (username.trim() === '' || password.trim() === '') {
            return login();
        }
        // Log in
        return new OctoKit({
            auth: {
                username: username,
                password: password,
                async on2fa() {
                    return (await window.showInputBox())!;
                }
            }
        });
    }

    export function login(): OctoKit {
        window.showErrorMessage(
            "You need to log in with GitHub to continue.", "Login", "Ignore"
        ).then((data) => {
            if (data !== 'Login') {
                return;
            }
            // Select login method
            window.showQuickPick(["Username & Password", "Personal Token"], {
                ignoreFocusOut: true
            }).then((data) => {
                window.showInformationMessage(data!);
            });
        });
        return new OctoKit();
    }
}