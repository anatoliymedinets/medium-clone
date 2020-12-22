import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { RegisterComponent } from '@/auth/components/register/register.component'
import { LoginComponent } from '@/auth/components/login/login.component'
import { reducer } from '@/auth/store/redusers'
import { AuthService } from '@/auth/services/auth.service'
import { RegisterEffect } from '@/auth/store/effects/register.effect'
import { LoginEffect } from '@/auth/store/effects/login.effect'
import { GetCurrentUserEffect } from '@/auth/store/effects/get-current-user.effect'
import { BackendErrorMessagesModule } from '@/shared/modules/backend-error-messages/backend-error-messages.module'
import { PersistanceService } from '@/shared/services/persistance.service'

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
]

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
    ]),
    BackendErrorMessagesModule,
  ],
  exports: [],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
