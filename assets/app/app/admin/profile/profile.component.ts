import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _userService: UserService,
    private _authService: AuthService) { }

  ngOnInit() {
    this._userService.getUserById(this._authService.getUserId())
      .subscribe((data) => {
        console.log(data);
      }, (err) => {
        console.log(err);
      })
  }

}
