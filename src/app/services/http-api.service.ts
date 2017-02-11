import {Injectable} from "@angular/core"
import {Http, Response, Request, RequestMethod, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class HttpApiService {

  private static self: HttpApiService;

  constructor(private http: Http) {
    HttpApiService.self = this;
  }


  private static handleError(error: Response) {
    console.log(error);
    return Observable.throw(error || "Server Error");
  }


  private submitRequest(methodType: RequestMethod, url: string, data: any = null, isAuthorizedRequest) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (isAuthorizedRequest)
      headers.append('Authorization', 'Bearer ' + localStorage.getItem("access_token"));


    return this.http.request(new Request({
      method: methodType,
      url: url,
      headers: headers,
      body: data
    }))
      .map((res: Response) => res.json())
      .do((res: Response) => console.log(res))
      .catch(HttpApiService.handleError);
  }

  public post(url: string, data: any, isAuthorizedRequest: boolean = false) {
    return this.submitRequest(RequestMethod.Post, url, data, isAuthorizedRequest);
  }

  public put(url: string, data: any, isAuthorizedRequest: boolean = false) {
    return this.submitRequest(RequestMethod.Put, url, data, isAuthorizedRequest);
  }

  public get(url: string, isAuthorizedRequest: boolean = false) {
    return this.submitRequest(RequestMethod.Get, url, null, isAuthorizedRequest);
  }
  public delete(url: string, isAuthorizedRequest: boolean = true) {
    return this.submitRequest(RequestMethod.Delete, url, null, isAuthorizedRequest);
  }

}
