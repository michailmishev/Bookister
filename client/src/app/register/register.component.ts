import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserRegister } from 'src/app/models/user-register';
import { UserLogin } from 'src/app/models/user-login';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/register-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit, OnDestroy {
  public loginSubscription: Subscription;
  public registerSubscription: Subscription;
  public frmSignup: FormGroup;
  public errorUsernameTaken: void;
  public errorEmailTaken: void;
  public succesMesage: void;

  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {this.frmSignup = this.createSignupForm(); }

  ngOnInit() {
  }

  // public register(username: string, email: string, password: string, checkbox) {
  //   const user: UserRegister = { username, email, password };
  //   this.registerSubscription = this.authService.register(user).subscribe((data) => {
  //     if (checkbox) {
  //       console.log(checkbox);

  //       this.login(data.data.username, password);
  //     }
  //   });
  // }

  public login(username: string, password: string) {
    const user: UserLogin = { username, password };
    this.loginSubscription = this.authService.login(user).subscribe((data) => {
      this.router.navigate(['/posts']);
    });
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        username: [
          null,
          Validators.compose([Validators.required,
            // CustomValidators.patternValidator(/[A-Za-z]/, {
            //   isString: true
           // })
          ])
        ],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(6)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit(checkbox) {
    const data = this.frmSignup.value;
    const user: UserRegister = {
      username: data.username,
      email: data.email,
      password: data.password
    };

    const loginuser = data.username;
    const loginpass = data.password;

    this.registerSubscription = this.authService.register(user).subscribe((theData) => {

      if (theData.message === 'Successful registration!') {
        this.succesMesage = theData.message;
      }
      if (checkbox) {
        this.login(loginuser, loginpass);
      }

      }, (err: any) => {
        if (err.error.message === 'This username is taken!') {
          this.errorUsernameTaken = err.error.message;
        }
        if (err.error.message === 'This email is taken!') {
          this.errorEmailTaken = err.error.message;
        }
      });
  }

}
