import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'jugadores', pathMatch: 'full' },
    { path: 'jugadores', loadComponent: () => import('./features/jugadores/jugadores.component').then(m => m.JugadoresComponent) },
    { path: 'ejercicios', loadComponent: () => import('./features/ejercicios/ejercicios.component').then(m => m.EjerciciosComponent) },
    { path: '**', redirectTo: 'jugadores' } // Fallback
];
