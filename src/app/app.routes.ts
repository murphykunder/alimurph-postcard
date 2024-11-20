import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/card-form/card-form.module').then(module => module.CardFormModule)
    },
    {
        path: 'card',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'card/:id',
        loadChildren: () => import('./modules/card/card.module').then(module => module.CardModule)
    }
];
