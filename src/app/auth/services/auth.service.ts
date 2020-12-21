import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { RegisterRequestInterface } from '@/auth/types/registerRequest.interface'
import { CurrentUserInterface } from '@/shared/types/currentUser.interface'
import { AuthResponseInterface } from '@/auth/types/authRespomse.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>('/api/users', data)
      .pipe(map((response: AuthResponseInterface) => response.user))
  }
}
