import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

export class Service {
    public url: string;

    constructor() {
        this.url = environment.apiUrl;

    }

    protected getApiRoute(route: string) {
        return this.url + route;
    }

    get headers() {
        let headers = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/json');

        return { headers: headers };
    }

}