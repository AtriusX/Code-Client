export interface Command {
    
    command: string;
    
    run(): Promise<void>;
}