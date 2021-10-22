import { Component, OnInit ,Input} from '@angular/core';
import { AuthService } from '../services/user-services.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @Input() id : any
  @Input() item : any
  closeResult = '';
  Contact = {fullname:"",email:"",age:"",phone:""};
  token = localStorage.getItem("token");

  constructor(private modalService: NgbModal,private authService: AuthService,private router:Router) { }

  open(content :any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

    editContact(id : any,token :any,Contact:any) {
      this.authService.editContact(id,this.token,this.Contact)
        .subscribe(
          res => {
            alert(res.msg)
            this.reloadComponent()
           })
    }

    getContactById(id : any,token:any) {
      this.authService.getContactById(id,this.token)
        .subscribe(
          res => {
           this.Contact = res.Contact
           })
    }
  ngOnInit(): void {
    this.getContactById(this.id,this.token)
  }

}
