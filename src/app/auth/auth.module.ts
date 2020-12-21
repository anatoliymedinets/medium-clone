import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { RegisterComponent } from '@/auth/components/register/register.component'
import { reducer } from '@/auth/store/redusers'
import { AuthService } from '@/auth/services/auth.service'
import { RegisterEffect } from '@/auth/store/effects/register.effect'
import { BackendErrorMessagesModule } from '@/shared/modules/backend-error-messages/backend-error-messages.module'
import { PersistanceService } from '@/shared/services/persistance.service'

const routes: Routes = [{ path: 'register', component: RegisterComponent }]

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([RegisterEffect]),
    BackendErrorMessagesModule,
  ],
  exports: [],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
