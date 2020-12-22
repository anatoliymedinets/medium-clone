import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { RegisterRequestInterface } from '@/auth/types/registerRequest.interface'
import { CurrentUserInterface } from '@/shared/types/currentUser.interface'
import { AuthResponseInterface } from '@/auth/types/authRespomse.interface'
import { LoginRequestInterface } from '@/auth/types/loginRequest.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  private getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user
  }

  public register(
    data: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>('/api/users', data)
      .pipe(map(this.getUser))
  }

  public login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponseInterface>('/api/users/login', data)
      .pipe(map(this.getUser))
  }

  public getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http
      .get<AuthResponseInterface>('/api/user')
      .pipe(map(this.getUser))
  }
}
