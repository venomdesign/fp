import { AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/index';

export class EmailValidator {
    static isUnique(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'ric.castagna@gmail.com') {
                    resolve({ isUnique: true });
                } else {
                    resolve(null);
                }
            }, 2000);
        });
    }
}
