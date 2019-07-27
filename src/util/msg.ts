import { window } from "vscode";

export namespace msg {

    export function info(message: string) {
        window.showInformationMessage(message);
    }

    export function error(message: string) {
        window.showErrorMessage(message);
    }

    export function button(message: string, button: string, action: () => any) {
        window.showInformationMessage(message, button).then(action);
    }

    export function boolean(
        message: string, 
        positive: string, 
        negative: string, 
        action: () => any
    ) {
        return window.showInformationMessage(message, positive, negative)
                .then(selection => selection === positive ? true : false)
                .then(action);
    }
}