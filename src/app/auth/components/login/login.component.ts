import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { loginAction } from '@/auth/store/actions/login.action'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '@/auth/store/selectors'
import { LoginRequestInterface } from '@/auth/types/loginRequest.interface'
import { BackendErrorsInterface } from '@/shared/types/backendErrors.interface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSubmit(): void {
    const request: LoginRequestInterface = { user: this.form.value }
    this.store.dispatch(loginAction({ request }))
  }
}
