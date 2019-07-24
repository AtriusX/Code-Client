import { ExtensionContext, commands } from "vscode";

/**
 * Baseline descriptor for all extension commands.
 */
export interface Command {
    
  /**
   * The unique command ID used for differentiating commands inside VS Code.
   */
  command: string;
  
  /**
   * This method will be ran when VS Code calls on the corresponding command ID.
   */
  run(): Promise<void>;
}

/**
 * Command registration system that automatically processes all command subscriptions.
 */
export namespace Commands {

  /**
   * Takes a list of Commands and subscribes them to the extension's context.
   * 
   * @param context The ExtensionContext supplied by the extensions `activate()` method.
   * @param cmds The Command list passed to the extension for processing.
   */
  export function register(context: ExtensionContext, ...cmds: Command[]) {
    for (var c of cmds) {
      let cmd = commands.registerCommand('managit.' + c.command, c.run);
      context.subscriptions.push(cmd);
    }
  }    
}