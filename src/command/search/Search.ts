import { commands } from 'vscode';
import { Command } from '..';
import { input }   from '../../util';
import { config }  from '../../config';

export class Search implements Command {
    command: string = 'search-repos';    
    
    async run(): Promise<void> {
        let type = await input.pick([
            'Code', 'Commits', 'Issues', 'Issues & Pull Requests',
            'Repositories', 'Topics', 'Users'
        ]);
        if (!type) return;

        let query = await input.input('Search');
        if (!query) return;

        let req = { q: query };

        let account = config.currentAccount();
        if (!account) return;

        let search = account.login().search, results;
        switch(type) {
            case 'Code':
                results = await search.code(req);
                break;
            case 'Commits':
                results = await search.commits(req);
                break;
            case 'Issues':
                results = await search.issues(req);
                break;
            case 'Issues & Pull Requests':
                results = await search.issuesAndPullRequests(req);
                break;
            case 'Repositories':
                results = await search.repos(req);
                break;
            case 'Commits':
                results = await search.topics(req);
                break;
            case 'Commits':
                results = await search.users(req);
                break;
            default: return;
        }

        console.log(results);
    }
}