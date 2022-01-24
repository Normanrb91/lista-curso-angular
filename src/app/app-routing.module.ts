import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cursos',
    pathMatch: 'full'
  },
  {
    path: 'cursos',
    loadChildren: () => import('./pages/cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'form/:i',
    loadChildren: () => import('./pages/cursos-form/cursos-form.module').then( m => m.CursosFormPageModule)
  },
  {
    path: 'cursos/detail/:i',
    loadChildren: () => import('./pages/curso-detail/curso-detail.module').then( m => m.CursoDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
