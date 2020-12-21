import { Component, Input, OnInit } from '@angular/core'

import { BackendErrorsInterface } from '@/shared/types/backendErrors.interface'

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps!: BackendErrorsInterface | null

  errorMessages!: string[]

  ngOnInit(): void {
    this.errorMessages = this.backendErrorsProps
      ? Object.keys(this.backendErrorsProps).map((name: string) => {
          const messages = (this.backendErrorsProps as BackendErrorsInterface)[
            name
          ].join(', ')
          return `${name} ${messages} `
        })
      : []
  }
}
