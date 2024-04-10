import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DiettrackerService } from './diettracker.service';

export const authGuard: CanActivateFn = (route, state) => {
  if(inject(DiettrackerService).session)return true;
  inject(Router).navigateByUrl('/');
  return false;

};
