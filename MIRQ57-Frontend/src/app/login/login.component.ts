import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ɵangular_packages_forms_forms_q } from '@angular/forms';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { setCookie, userCookieName } from '../utilities/cookie.utils';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    userNotFound = false;
    returnUrl: string;
    user: User = new User();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit(username: string, password: string) {
        this.submitted = true;
        
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        
        this.loading = true;
        this.userNotFound = false;
        
        // Validate user
        this.userService.getUser(username, password).subscribe(user => {
            console.log("loading user");
            if(user && user.UserID){
                setCookie(userCookieName, user.UserID.toString());
                this.loading = false;
                this.router.navigate(['calendar']);
            }
            else{
                console.log("user not found");
                this.userNotFound = true;
                this.loading = false;
                this.f.password.setErrors({valid: false})
            }
        })
    }
}
