import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SingleCardComponent } from './pages/single-card/single-card.component';
import { GroupCardComponent } from './pages/group-card/group-card.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
        {
            path: '',
            component: SingleCardComponent
        },
        {
            path: 'group-card',
            component: GroupCardComponent
        },
        {
          path: 'about',
          component: AboutComponent
        }
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CardFormModule { }
