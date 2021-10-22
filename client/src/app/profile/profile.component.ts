import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user-services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user :any = localStorage.getItem("user")
User = JSON.parse(this.user);

Contacts :any = []
token = localStorage.getItem("token");

  constructor(private authService: AuthService,private router: Router) { }

  

  ngOnInit(): void {
  this.getContacts()
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

    setFormData(data :any) {
      this.Contacts = data;
     }
  
    getContacts() {
      this.authService.getContacts(this.token)
        .subscribe(
          res => {
            res.Contacts.map((el :any) => {
              this.Contacts.push(el)
          },
        )})
    }
  
   deleteContact(id:any,token :any) {
      this.authService.deleteContact(id,this.token)
        .subscribe(
          res => {
            alert(res.msg)
            this.reloadComponent()
           })
    }

  
}
