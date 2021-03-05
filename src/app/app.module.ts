import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
//
import { reducers, metaReducers } from '~/app/state/dashboard/dashboard.reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { environment } from '~/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TopnavComponent } from '~/app/components/topnav/topnav.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, TopnavComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    DashboardModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 5 }) : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
