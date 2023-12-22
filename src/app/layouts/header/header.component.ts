import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any = '';
  isLoggedin$!: Observable<boolean>;

  // end with '$' represents observable

  constructor(private authservice: AuthService){}
  ngOnInit()
  {
    this.user = JSON.parse(localStorage.getItem('user') || '{}').email;
    this.isLoggedin$ = this.authservice.isLoggedin();
  }

  onLogout(){
    this.authservice.logout();
  }
}

