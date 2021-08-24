import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from "./components/root/root.component";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: RootComponent,
    children: [
      {
        path: 'home',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/home/home.module').then(
            m => m.HomeModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
