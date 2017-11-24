import { BaseRequestOptions, ResponseContentType, URLSearchParams } from "@angular/http";

export class IssueRequestOptions extends BaseRequestOptions {
  
  constructor(token:string,queryParams?:URLSearchParams){
    super();
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Authorization',`Bearer ${token}`);
    this.headers.append('Content-Type', 'application/json;charset=utf-8');
    this.headers.append('Accept', 'application/json;charset=utf-8');
    queryParams? this.search = queryParams : null;
    this.responseType = ResponseContentType.Json;
  }

}
