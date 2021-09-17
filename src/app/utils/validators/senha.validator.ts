import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class SenhaValidator {

    public static number(control: FormControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);
        const valid = hasNumber;
        if (!valid) {
            // return what´s not valid
            return { number: true };
        }
        return null as any;
    }

    public static upper(control: FormControl): ValidationResult {
        let hasUpper = /[A-Z]/.test(control.value);
        const valid = hasUpper;
        if (!valid) {
            // return what´s not valid
            return { upper: true };
        }
        return null as any;
    }

    public static lower(control: FormControl): ValidationResult {
        let hasLower = /[a-z]/.test(control.value);
        const valid = hasLower;
        if (!valid) {
            // return what´s not valid
            return { lower: true };
        }
        return null as any;
    }

    public static caracters(control: FormControl): ValidationResult {
        let hasCaracters = /[#@$%^&*()]/.test(control.value);
        const valid = hasCaracters;
        if (!valid) {
            // return what´s not valid
            return { caracters: true };
        }
        return null as any;
    }

}