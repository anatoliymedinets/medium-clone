import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { TopBarComponent } from './components/top-bar/top-bar.component'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
})
export class TopBarModule {}
