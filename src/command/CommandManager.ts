import { commands, ExtensionContext } from "vscode";
import { Command } from "./Command";

export namespace CommandManager {
    export function register(context: ExtensionContext, ...cmds: Command[]) {
        for (var c of cmds) {
            let cmd = commands.registerCommand('managit.' + c.command, c.run);
            context.subscriptions.push(cmd);
        }
    }    
}