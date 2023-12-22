import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth: AngularFireAuth, private toastr: ToastrService, private router: Router ) { }
  login(email: string, password: string)
  {
    this.afauth.signInWithEmailAndPassword(email, password).then((logRef)=>{
      this.toastr.success("Logged in Successfully");
      this.router.navigate(['/']);
    })
    .catch(err =>{
      this.toastr.warning(err);

    })
  }
}
