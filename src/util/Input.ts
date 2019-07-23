import { window } from "vscode";

export namespace Input {

    export async function booleanChoice(
        positive:    string, 
        negative:    string, 
        placeHolder: string = '', 
        chain:       any
    ): Promise<boolean | undefined> {    
        if (chain !== undefined) {
            console.log(chain);
            let res = await window.showQuickPick([positive, negative], {
                placeHolder: placeHolder
            }, undefined);
    
            switch(res) {
                case positive: return true;
                case negative: return false;
                default:       return undefined;
            }    
        }

        return undefined;

    }

    export async function input(
        prompt:   string  = '', 
        chain:    any,
        password: boolean = false
    ): Promise<string | undefined> {    
        if (chain !== undefined) {
            console.log(chain);
            return await window.showInputBox({
                prompt: prompt,
                password: password
            }, undefined);
        }

        return undefined;
    }

    export async function pick(
        items:       string[], 
        placeHolder: string = '', 
        chain:       any
    ): Promise<string | undefined> {
        if (chain !== undefined) { 
            console.log(chain);
            return await window.showQuickPick(items, {
                placeHolder: placeHolder
            }, undefined);
        }
        
        return undefined;
    }
}