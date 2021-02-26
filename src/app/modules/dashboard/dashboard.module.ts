import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
//
import { DashboardComponent } from '~/app/components/dashboard/dashboard.component';
import { GameComponent } from '~/app/components/game/game.component';
import { DashboardEffects } from '~/app/state/dashboard/dashboard.effects';

@NgModule({
  declarations: [DashboardComponent, GameComponent],
  imports: [CommonModule, HttpClientModule, EffectsModule.forFeature([DashboardEffects])],
  exports: []
})
export class DashboardModule {}
