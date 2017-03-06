import { FormControl} from '@angular/forms';

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
            'url':'Formato de url incorrecto. Utilice el prefijo http:// o https://'
        };
        return config[validatorName];
    }

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

    static matchPasswordValidator(password: FormControl) {
	    return (c: FormControl) => {
            if(password.value!=c.value){
    	        return { 'mismatchedPasswords': true };
    	    }else{
                return null;
            }
        }
	}

    static termsAccepted(control:FormControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if(control.value){
            return null;
        } else {
            return { 'termsAccepted': true };
        }
    }

    static date(control:FormControl) {
        //            - Assert date format dd/mm/yyyy
        if(control.value){
            if (control.value.match(/^(0[1-9]|[12][0-9]|3[01])[\/\-](0[1-9]|1[012])[\/\-]\d{4}$/)) {
                return null;
            } else {
                return { 'date': true };
            }
        }
    }
	
}