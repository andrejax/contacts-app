import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AllComponent } from './all/all.component';
import { ModifyContactComponent } from './modify-contact/modify-contact.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: AllComponent,
      pathMatch: 'full'
    },
    {
      path: '**',
      component: AllComponent,
      pathMatch: 'full'
    }
  ])
  ],
  declarations: [
    AllComponent,
    ModifyContactComponent
  ],
})
class ContactsModule { }

export {
    ContactsModule,
    AllComponent
};
