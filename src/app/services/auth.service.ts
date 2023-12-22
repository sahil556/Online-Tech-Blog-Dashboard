import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  isLoggedinguard: boolean = false;
  constructor(private afauth: AngularFireAuth, private toastr: ToastrService, private router: Router ) { }
  login(email: string, password: string)
  {
    this.afauth.signInWithEmailAndPassword(email, password).then((logRef)=>{
      this.toastr.success("Logged in Successfully");
      this.loadUser()
      this.loggedIn.next(true);
      this.isLoggedinguard = true;
      this.router.navigate(['/']);
    })
    .catch(err =>{
      this.toastr.warning(err);

    })
  }

  loadUser()
  {
    this.afauth.authState.subscribe(user =>{
      localStorage.setItem('user', JSON.stringify(user));
    })
  }


  logout()
  {
    this.afauth.signOut().then(()=>{
      this.loggedIn.next(false);
      localStorage.removeItem('user');
      this.isLoggedinguard = false;
      this.toastr.success("Logged Out Successfully")
      this.router.navigate(['/login'])
    })
  }

  isLoggedin()
  {
    return this.loggedIn.asObservable();
  }










}
