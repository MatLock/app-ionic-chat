import { Injectable, Inject } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { VerboseHTTP } from '../config/VerboseHTTP';
import { Constant } from '../config/Constant';
import { Endpoint } from '../config/Endpoint';
import { JwtHelper } from 'angular2-jwt';
import  { IssueRequestOptions } from '../models/IssueRequestOptions';
import { EnvVariables } from '../app/environment-variables/environment-variables.token';

@Injectable()
export class RestServices {

  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http,@Inject(EnvVariables) private envVariables){}




  /** Permite realizar la autenticacion contra CAS y Security */
  public login(user:any):Promise<any>{
    return Promise.resolve();
  }

  /** Permite realizar logout del usuario , elimina el refreshToken y accessToken */
  public logout():Promise<any>{
    return Promise.resolve();
  }











  /**
   * Permite ejecutar un servicio REST , realizando las validaciones:
   * --> Si el token esta expirado , se renueva y realiza el request
   * --> Si el token esta por vencer , se toma el nuevo access del header
   * --> Si el refreshToken fue dado debaja
   * @param verbo: Verbo a ejecutar GET,POST,PUT,DELETE, usar el enum
   * @param endpoint: El endpoint a ejecutar
   * @param data : Data a enviar si es un POST, se realiza la conversion a JSON
   */
  public execute(verbo:VerboseHTTP,endpoint:string,data?:any,queryParams?:URLSearchParams):Observable<any>{
    switch(verbo){
      case VerboseHTTP.GET: 
        return this.get(endpoint,queryParams);
      case VerboseHTTP.POST:
        return this.post(endpoint,data);
      case VerboseHTTP.DELETE:
        return this.delete(endpoint);
      case VerboseHTTP.PUT:
        return this.put(endpoint);
    }
  }

  private get(endpoint:string,queryParams:URLSearchParams):Observable<any>{
   return this.http.get(endpoint,new IssueRequestOptions(null,queryParams)).flatMap(res=>res.json());
  }

  private post(endpoint:string,data:any):Observable<any>{
    return this.http.post(endpoint,new IssueRequestOptions(null),JSON.stringify(data)).map(res=>res.json());
  }

  private delete(endpoint:string):Observable<any>{
    return this.http.delete(endpoint,new IssueRequestOptions(null)).map(res=>res.json());
  }

  private put(endpoint:string):Observable<any>{
    return this.http.get(endpoint,new IssueRequestOptions(null)).map(res=>res.json());
  }

}
