import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { catchError, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'

import { AuthService } from '@/auth/services/auth.service'
import { CurrentUserInterface } from '@/shared/types/currentUser.interface'
import { PersistanceService } from '@/shared/services/persistance.service'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '@/auth/store/actions/get-current-user.action'
import { ACCESS_TOKEN } from '@/shared/constants'

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get(ACCESS_TOKEN)
        if (!token) {
          return of(getCurrentUserFailureAction())
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({ currentUser })
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}
}
