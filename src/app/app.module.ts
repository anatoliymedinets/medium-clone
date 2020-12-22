import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'

import { environment } from 'src/environments/environment'

import { AppRoutingModule } from '@/app-routing.module'
import { AppComponent } from '@/app.component'
import { AuthModule } from '@/auth/auth.module'
import { TopBarModule } from '@/shared/modules/top-bar/top-bar.module'
import { PersistanceService } from '@/shared/services/persistance.service'
import { AUthInterceptor } from '@/shared/services/auth-interceptor.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    TopBarModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AUthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
