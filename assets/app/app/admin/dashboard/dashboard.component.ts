import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@app/core/services/auth.service';
import { UserService } from '@app/shared/services/user.service';

import { User } from "@app/shared/models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userProfile: User = new User();

  constructor(private _authService: AuthService,
    private _toastr: ToastrService,
    private _router: Router,
    private _userService: UserService) { }

  ngOnInit() {
    this.userProfile.name = "";
    this.userProfile.photo = '@assets/images/gravatar.png';
    this.getUserProfile();
  }

  getUserProfile() {
    this._userService.getUserById(this._authService.getUserId())
      .subscribe(data => {
        this.userProfile.name = data['data']['name'];
        this.userProfile.photo = data['data']['photo']
      }, err => {
        this.userProfile.name = "";
        this.userProfile.photo = '../../../assets/images/gravatar.png';
      })
  }

  logout() {
    this._authService.logout()
      .subscribe(
        data => {
          this._authService.revokeSession();
          this._toastr.success(data["message"], 'Success!');
          this._router.navigate(['/login']);
        },
        error => {
          this._toastr.error(error.error['message'], 'Error!');
        }
      );
  }

}
