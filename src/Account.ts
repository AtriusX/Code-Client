import { AccountType } from './Account';
export class Account {
    type: AccountType
    name: string
    key:  string

    constructor(type: AccountType, name: string, key: string) {
        this.type = type;
        this.name = name;
        this.key  = key;
    }
}

export const AccountType = {
    USER:  'Username & Password',
    TOKEN: 'Token'
}