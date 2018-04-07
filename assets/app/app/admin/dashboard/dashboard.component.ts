import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _authService: AuthService,
    private _toastr: ToastrService,
    private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    this._authService.logout().subscribe(
      data => {
        this._authService.removeToken();
        this._toastr.success(data["message"], 'Success!');
        this._router.navigate(['/login']);
      },
      error => {
        this._toastr.error(error.error['message'], 'Error!');
      }
    );
  }

}
