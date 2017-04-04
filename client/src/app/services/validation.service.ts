import { FormControl, FormGroup} from '@angular/forms';

import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';


export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Este campo es obligatorio',
            'creditCard': 'Número de tarjeta de credito no válido',
            'invalidPassword': 'La constraseña debe contener al menos 6 characters y un número.',
            'minlength': `Se requieren al menos ${validatorValue.requiredLength} caracteres`,
            'equal':'Los campos de no coinciden',
            'mismatchedPasswords':'Las constraseñas no coinciden',
            'email':'Dirección de correo no válida',
            'termsAccepted':'Debe aceptar los terminos para continuar',
            'digits':'Digite únicamente números',
            'date':'Formato de fecha no válido',
            'url':'Formato de url incorrecto. Utilice el prefijo http:// o https://',
            'choice':`Se requiere al menos ${validatorValue.min} campo y máximo ${validatorValue.max}`,
            'async':`email taken`
        };
        return config[validatorName];
    }
    /**
     * Valida la seguridad del campo de password
     **/
    static passwordValidator(control:FormControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if(control.value){
	        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
	            return null;
	        } else {
	            return { 'invalidPassword': true };
	        }
	    }
    }
    /**
     * Valida que los campos de password coincidan
     **/
    static matchPasswordValidator(password: FormControl) {
	    return (c: FormControl) => {
            if(password.value!=c.value){
    	        return { 'mismatchedPasswords': true };
    	    }else{
                return null;
            }
        }
	}
    /**
     * Valida el checkbox de terminos aceptados
     **/
    static termsAccepted(control:FormControl) {
        if(control.value){
            return null;
        } else {
            return { 'termsAccepted': true };
        }
    }
    
    /**
     * Valida la seleccion de al menos "min" campos (checkbox o inputs) y maximo "max" campos
     * Por defecto min=1 y max=numero de controles del FormGroup.
     **/
    static choice(min:number=1,max:number=-1) {

        return (formGroup: FormGroup) => {
            let count=0;
            let totalParams=0;
            for (let key in formGroup.controls) {
                if (formGroup.controls.hasOwnProperty(key)) {
                    totalParams++;
                    let control: FormControl = <FormControl>formGroup.controls[key];
                    if (control.value) {
                        count++;
                    }
                }
            }
            if(max>min && max!=-1){
                totalParams=max;
            }
            if(count>=min && count<=totalParams){
                return null;
            }else{
                return {
                    choice: {
                        valid: false,
                        min:min,
                        max:totalParams
                    }
                };
            }
        }
    }

    static async(userService,param){
        return (control: FormControl):Observable<any> => {
            return new Observable((obs:any) => {
                control.valueChanges.debounceTime(400).flatMap(userService.userExists(param)).subscribe(
                    response => {
                        console.log(response);
                        obs.next({ 'async': true });
                        obs.complete();
                    },
                    error => {
                        console.log(error);
                        obs.next(null);
                        obs.complete();
                    }
                )
            });
        }
    }
}