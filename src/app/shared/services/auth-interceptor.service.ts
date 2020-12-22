import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { PersistanceService } from '@/shared/services/persistance.service'
import { ACCESS_TOKEN } from '@/shared/constants'

@Injectable()
export class AUthInterceptor implements HttpInterceptor {
  constructor(private persistanceService: PersistanceService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistanceService.get(ACCESS_TOKEN)
    req = req.clone({
      setHeaders: {
        Authorization: token ? `Token ${token}` : '',
      },
    })
    return next.handle(req)
  }
}
