import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import * as auth from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  
    constructor(private router: Router) { }
  
    login(username: string, password: string): boolean {
      if (username === 'admin' && password === '123456') {
        this.isAuthenticatedSubject.next(true);
        return true;
      }
      return false;
    }
  
    logout() {
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/login']);
    }
  
    isLoggedIn(): boolean {
      return this.isAuthenticatedSubject.value;
    }
}
