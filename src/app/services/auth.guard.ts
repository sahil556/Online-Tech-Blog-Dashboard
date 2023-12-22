import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {

  const authservice: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const toastr : ToastrService = inject(ToastrService);
  if(authservice.isLoggedinguard)
    return true;
  else
  {
    toastr.warning("You don't have permission to access this page.")
    router.navigate(['/login']); 
    return false;
  }
};
