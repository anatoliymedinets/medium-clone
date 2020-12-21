import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'

import { registerAction } from '@/auth/store/actions/register.action'
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '@/auth/store/selectors'
import { RegisterRequestInterface } from '@/auth/types/registerRequest.interface'
import { BackendErrorsInterface } from '@/shared/types/backendErrors.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = { user: this.form.value }
    console.log(this.form)
    this.store.dispatch(registerAction({ request }))
  }
}
