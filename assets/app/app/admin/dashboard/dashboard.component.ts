import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';
import { User } from "../../shared/models/user";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userProfile: User;

  constructor(private _authService: AuthService,
    private _toastr: ToastrService,
    private _router: Router,
    private _userService: UserService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this._userService.getUserById(this._authService.getUserId())
      .subscribe(data => {
        console.log(data['data'])
        this.userProfile = new User();
        this.userProfile.name = data['data']['name'];
        this.userProfile.photo = data['data']['photo']
      }, err => {
        console.log(err)
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
