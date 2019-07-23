import { Command } from "..";
import { window, TreeDataProvider, TreeItem, workspace } from "vscode";

export class DeleteGist implements Command {
    command: string = 'delete-gist';   
    
    async run(): Promise<void> {
        
    }
}