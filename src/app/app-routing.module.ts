import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const AppRoutes = {
  HOME: '',
  PET_DETAILS: 'pet-details/:id',
  PET_DETAILS_ID: 'pet-details',
  NOT_FOUND: '**'
}

export const routes: Routes = [
  { path: AppRoutes.HOME, loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: AppRoutes.PET_DETAILS, loadChildren: () => import('./pages/pet-details/pet-details.module').then(m => m.PetDetailsModule) },
  { path: AppRoutes.NOT_FOUND, redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
