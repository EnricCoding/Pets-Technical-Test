import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PetOfTheDayComponent } from './components/pet-of-the-day/pet-of-the-day.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomeComponent,
    PetListComponent,
    PetOfTheDayComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
    TranslateModule
  ]
})
export class HomeModule { }
