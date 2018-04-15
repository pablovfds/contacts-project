import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/shared/services/user.service';
import { AuthService } from '@app/core/services/auth.service';

import { User } from '@app/shared/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  actualProfile: User = new User();

  constructor(private _userService: UserService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.actualProfile.photo = "../../../assets/images/gravatar.png";
    this._userService.getUserById(this._authService.getUserId())
      .subscribe((data) => {
        if (data && data['code'] === 200) {
          let userData = data['data'];
          this.actualProfile.name = userData['name'];
          this.actualProfile.email = userData['email'];
          this.actualProfile.photo = userData['photo'];
          this.actualProfile.phone = userData['phone'];
        }
      }, (err) => {
        console.log(err);
      })
  }

}
