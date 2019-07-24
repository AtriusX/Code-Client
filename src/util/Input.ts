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
}