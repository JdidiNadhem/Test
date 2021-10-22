import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {email:"",password:""}; 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signIn() {
    this.authService.loginUser(this.user)
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

