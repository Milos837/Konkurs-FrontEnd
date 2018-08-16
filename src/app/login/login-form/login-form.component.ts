import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model: any = {};
  loading = false;
  loginFailed = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.loginFailed = false;
    this.loading = true;
    this.authService
      .login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.loading = false;
          if (data) {
            this.authService.saveCredentials(this.model.username, this.model.password, data['role']);
            if (data['role'] === 'ROLE_ADMIN') {
              this.router.navigate(['/admin/postings']);
            }
          } else {
            console.error(data);
          }
        },
        error => {
          console.error(error);
          this.loading = false;
          this.loginFailed = true;
        }
    );
}

}
