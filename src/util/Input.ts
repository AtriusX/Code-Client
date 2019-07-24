import { window, QuickPickOptions, InputBoxOptions } from "vscode";

export namespace Input {

    export async function booleanChoice(
        positive:    string, 
        negative:    string, 
        placeHolder: string = ''
    ): Promise<boolean | undefined> {
        let res = await window.showQuickPick([positive, negative], {
            placeHolder: placeHolder
        }, undefined);

        switch(res) {
            case positive: return true;
            case negative: return false;
            default:       return undefined;
        }    
    }

    export async function input(
        prompt:   string  = '', 
        password: boolean = false
    ): Promise<string | undefined> {    
        return await window.showInputBox({
            prompt: prompt,
            password: password
        }, undefined);
    }

    export async function pick(
        items:       string[], 
        placeHolder: string = '', 
    ): Promise<string | undefined> {
        return await window.showQuickPick(items, {
            placeHolder: placeHolder
        }, undefined);
    }

    export async function sequence(
        steps: Question[]
    ): Promise<Array<boolean | string | undefined>> {
        let results: Array<boolean | string | undefined> = [];
        for (let i = 0; i < steps.length; i++) {
            let result: boolean | string | undefined;
            
            let step = steps[i];
            switch (step.type) {
                case 'text': case 'pass':
                    result = await input(step.text, step.type === 'pass');
                    break;
                case 'bool':
                    let [pos, neg] = step.inputs!;
                    result = await booleanChoice(pos, neg, step.text);
                    break;
                case 'pick':
                    result = await pick(step.inputs!, step.text);
                    break;
            }
            console.log(result);
            if (!result) { 
                break; 
            }

            results.push(result);
        }
        return results;
    }
}

export class Question {
    type!:     'text' | 'pass' | 'bool' | 'pick';
    text?:     string;
    inputs?:   string[];
}