import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface LoginResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface SignupResponseData extends LoginResponseData {
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  API_KEY = environment.FIREBASE_API_KEY;
  SIGN_UP_URL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    this.API_KEY;
  LOGIN_URL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.API_KEY;

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.httpClient
      .post<SignupResponseData>(this.SIGN_UP_URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponseData>(this.LOGIN_URL, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Password is not correct';
          break;
      }
      return throwError(() => new Error(errorMessage));
    }
  }
}
