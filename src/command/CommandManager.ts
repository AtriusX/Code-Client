import { ExtensionContext, commands } from "vscode";
import { Command }                    from '.';

export class CommandManager {
    private static instance: CommandManager;

    private context: ExtensionContext;


    constructor(context: ExtensionContext) {
        this.context = context!;
    }

    static getInstance(context: ExtensionContext): CommandManager {
        
        if (!this.instance) {
            this.instance = new CommandManager(context);
        }

        return this.instance;
    }

    register(...cmds: Command[]) {
        for (var c of cmds) {
            let cmd = commands.registerCommand('managit.' + c.command, c.run);
            this.context.subscriptions.push(cmd);
        }
    }
}