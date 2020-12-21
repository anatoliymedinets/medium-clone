import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BackendErrorMessagesComponent } from './components/backend-error-messages/backend-error-messages.component'

@NgModule({
  imports: [CommonModule],
  declarations: [BackendErrorMessagesComponent],
  exports: [BackendErrorMessagesComponent],
})
export class BackendErrorMessagesModule {}
