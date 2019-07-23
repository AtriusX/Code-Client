import { window } from "vscode";

export namespace Input {

    export async function booleanChoice(
        positive:    string, 
        negative:    string, 
        placeHolder: string = '', 
        chain:       any = true
    ): Promise<boolean | undefined> {    
        if (!chain) {
            return undefined;
        }

        let result = await window.showQuickPick([positive, negative], {
            placeHolder: placeHolder
        });

        if (result === undefined) {
            return result;
        } else {
            return result === positive ? true : false;
        }
    }

    export async function input(
        prompt:   string = '', 
        chain:    any = true,
        password: boolean = false
    ): Promise<string | undefined> {    
        if (!chain) {
            return undefined;
        }

        return await window.showInputBox({
            prompt: prompt,
            password: password
        });
    }

    export async function pick(
        items:       string[], 
        placeHolder: string = '', 
        chain:       any = true
    ): Promise<string | undefined> {
        if (!chain) { 
            return undefined;
        }

        return await window.showQuickPick(items, {
            placeHolder: placeHolder
        });
    }
}