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
  ): Promise<Array<string>> {
    let results: Array<string> = [];
    for (let step of steps) {
      let result: boolean | string | undefined;
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
      // End sequence if a result returns undefined
      if (result === undefined) { break; }
      // Execute the question's post-action
      if (step.action) {
        if (!step.action(result)) { break; }
      }
      // Add the result to the output
      results.push(result as string);
    }
    return results;
  }

  export class Question {
    type!:   'text' | 'pass' | 'bool' | 'pick';
    text?:   string;
    inputs?: string[];
    action?: (res: any) => void | undefined;
  }
}