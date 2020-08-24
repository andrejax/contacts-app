import { Component, OnInit, EventEmitter, Output, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as uuid from 'uuid';

import { ContactModel } from '../contacts.types';
import { Operation } from './modify-contact.types';
import { ContactsService } from '../contacts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modify-contact',
  templateUrl: './modify-contact.component.html',
  styleUrls: ['./modify-contact.component.css']
})
export class ModifyContactComponent implements OnInit {

  ngOnInit(): void {
    this.modifyContactForm = new FormGroup({
      firstName: new FormControl(this.contactData?.firstName, [Validators.required]),
      lastName: new FormControl(this.contactData?.lastName, [Validators.required]),
      email: new FormControl(this.contactData?.email, [Validators.required]),
      phoneNumber: new FormControl(this.contactData?.phoneNumber, [Validators.required]),
    });
  }

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  contactData: ContactModel;
  operation: Operation;
  contacts: ContactModel[];

  modifyContactForm: FormGroup;

  constructor(public modal: NgbActiveModal, private contactsService: ContactsService) { }

  get firstName() {
    return this.modifyContactForm.get('firstName');
  }

  get lastName() {
    return this.modifyContactForm.get('lastName');
  }

  save() {

    if (this.modifyContactForm.valid) {

      const contactModel: ContactModel = {
        email: this.modifyContactForm.value.email,
        firstName: this.modifyContactForm.value.firstName,
        lastName: this.modifyContactForm.value.lastName,
        phoneNumber: this.modifyContactForm.value.phoneNumber,
        _id: this.contactData ? this.contactData._id : uuid()
      };

      var operationObservable: Observable<any>;
      if (this.operation == Operation.Create) {
        operationObservable = this.contactsService.create(contactModel);
      }
      else if (this.operation == Operation.Update) {
        operationObservable = this.contactsService.update(contactModel);
      }

      operationObservable.subscribe(() => {
        this.passEntry.emit(contactModel);
        this.modal.dismiss();
      });
      
    }
  }


}
