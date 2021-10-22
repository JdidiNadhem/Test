import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = { fullname: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signUp() {
    this.authService.registerUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('user',JSON.stringify(res.User));
          this.router.navigate(['/profile']);
        },
        err => console.log(err)
      )
  }
}
