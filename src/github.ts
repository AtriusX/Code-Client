import    { window } from 'vscode';
import * as OctoKit  from '@octokit/rest';

export namespace github {
    
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