import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const tinyUrlToken = environment.tinyurl_api_key;

  if(tinyUrlToken && req.url.startsWith(environment.tinyurl_api_url)){
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + tinyUrlToken
      })
    });
    return next(authReq);
  }
  return next(req);
};
