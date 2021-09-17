import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

export abstract class BaseService {

    protected urlApi: string = environment.urlApi;

    protected obterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }
}