import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'control-messages',
  template: '<div *ngIf="errorMessage !== null">{{errorMessage}}</div>'
})

export class ControlMessagesComponent {
  
  @Input() control: FormControl;
  @Input() formGroup: FormGroup;
  @Input() message: string;
  
  constructor() { }

  get errorMessage() {
    if(this.control!=null){
      for (let propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
          if(this.message!=null){
            return this.message;
          }else{
            return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
          }
        }
      }  
    }else if(this.formGroup!=null){
      for (let propertyName in this.formGroup.errors) {
        if (this.formGroup.errors.hasOwnProperty(propertyName) && this.formGroup.touched) {
          if(this.message!=null){
            return this.message;
          }else{
            return ValidationService.getValidatorErrorMessage(propertyName, this.formGroup.errors[propertyName]);
          }
        }
      }
    }
    return null;
  }
}