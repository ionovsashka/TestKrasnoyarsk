import {FormControl} from "@angular/forms";

export class AuthValidator {
  static correctLogin(control: FormControl): {[key: string]: boolean} | null{
    if(control.value.includes('@reqres.in')){
      return null
    }
    return {incorrectLogin: true}
  }
}
