import { HttpInterceptorFn } from '@angular/common/http';
import { AUTH_TOKEN } from '../constants/constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem(AUTH_TOKEN);

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
