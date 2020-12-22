import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'

import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '@/auth/store/actions/login.action'
import { AuthService } from '@/auth/services/auth.service'
import { CurrentUserInterface } from '@/shared/types/currentUser.interface'
import { PersistanceService } from '@/shared/services/persistance.service'
import { ACCESS_TOKEN } from '@/shared/constants'

@Injectable()
export class LoginEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set(ACCESS_TOKEN, currentUser.token)
            return loginSuccessAction({ currentUser })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              loginFailureAction({ errors: errorResponse.error.errors })
            )
          })
        )
      })
    )
  )

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.router.navigateByUrl('/')
        })
      ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
