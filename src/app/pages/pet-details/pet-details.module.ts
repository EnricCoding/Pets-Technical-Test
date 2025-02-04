import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PetDetailsComponent } from './pet-details.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: '', component: PetDetailsComponent },
];

@NgModule({
  declarations: [PetDetailsComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    TranslateModule,

  ],
})
export class PetDetailsModule {}
