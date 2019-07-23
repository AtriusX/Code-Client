import * as Octokit from '@octokit/rest';

export class Account {
    type: AccountType;
    name: string;
    key:  string;

    constructor(type: AccountType, name: string, key: string) {
        this.type = type;
        this.name = name;
        this.key  = key;
    }

    login(): Octokit {
        let isUser = this.type === AccountType.USER;
        return new Octokit({
            auth: isUser ? {
                username: this.name,
                password: this.key,
                async on2fa() {
                    return '';
                }
            } : this.key,
            userAgent: 'Managit'
        });
    }
}

export enum AccountType {
    USER  = 'Username & Password',
    TOKEN = 'Token'
}