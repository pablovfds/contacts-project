import {AbstractControl, FormControl} from '@angular/forms';

export class BasicValidators {

  static email (control: FormControl){

    let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return EMAIL_REGEXP.test(control.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  static phone (control: FormControl){
    let PHONE_REGEXP = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

    return PHONE_REGEXP.test(control.value) ? null : {
      validatePhone: {
        valid: false
      }
    };
  }

  static Match(firstControlName, secondControlName) {
    return (ac: AbstractControl) => {
      let firstControlValue = ac.get(firstControlName).value;
      let secondControlValue = ac.get(secondControlName).value;
      if (firstControlValue != secondControlValue) {
        ac.get(secondControlName).setErrors({matchFields: true});
      } else {
        return null
      }
    };
  }
}
