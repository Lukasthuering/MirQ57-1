import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { UserService } from './user.service';
import { getCookie, userCookieName } from '../utilities/cookie.utils';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private router: Router) { }

    checkLogin() {
        var userId = getCookie(userCookieName);
        console.log(userId)
        if (userId) {

            this.userService.getUserById(userId).subscribe(u => {
                console.log(u);
                if (u && u.UserID) {
                    console.log(true);
                    return true;
                }
                else {
                    console.log("redirect to login, user not logged in")
                    this.router.navigate(['login']);
                    return false;
                }
            });
        }
        else {

            console.log("no userid");
            this.router.navigate(['login']);
            return false;
        }
    }
}