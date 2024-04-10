import { FoodDetails } from './foodDetails';
import { Observable, catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { SignUp } from './SignUp';
import { User } from './user';
import { Injectable } from '@angular/core';
import { Login } from './login';
import { AddFood } from './addFood';
import { ViewFood } from './ViewFood';
import { FetchUser } from './fetchUser';
import { Router } from '@angular/router';
import { Consumed } from './consumed';

@Injectable({
  providedIn: 'root',
})
export class DiettrackerService {
  private signupUrl = 'https://localhost:7236/api/Values/signup';
  private loginUrl = 'https://localhost:7236/api/Values/login';
  private adduserUrl = 'https://localhost:7236/api/Values/adduser';
  private updateuserUrl = 'https://localhost:7236/api/Values/updateuser';
  private addFoodUrl = 'https://localhost:7236/api/Values/adduserfood';
  private viewFoodUrl = 'https://localhost:7236/api/Values/fetchalluserfood/';
  private FoodDetailsUrl = 'https://localhost:7236/api/values/ViewFoodDetails/';
  private deleteviewUrl = 'https://localhost:7236/api/values/deletefoodview/';
  private deleteUrl = 'https://localhost:7236/api/values/deletefood/';
  private filterviewUrl = 'https://localhost:7236/api/values/filter1/';
  private fetchuserUrl1 = 'https://localhost:7236/api/values/fetchuserbyid1/';
  private fetchuserUrl = 'https://localhost:7236/api/values/fetchuserbyid/';
  private caloriesconsumedUrl = 'https://localhost:7236/api/values/consumed/';


  constructor(private http: HttpClient, private router: Router) {
    let session:any=localStorage.getItem('session');
    if(session){
      session=JSON.parse(session);
    }
    this.session=session;
  }

  session: any;

  setSession(user: any) {
    this.session = user;
  }

  getSession() {
    return this.session;
  }
  clearSession() {
    this.session = undefined;
  }
  private userid: any;
  setuserid(data: string) {
    this.userid = data;
  }

  getuserid() {
    return this.userid;
  }

  private foodname: any;
  setfoodname(data: any) {
    this.foodname = data;
  }

  getfoodname() {
    return this.foodname;
  }

  private no: any;
  setno(data: any) {
    this.no = data;
  }

  getno() {
    return this.no;
  }

  private count: any;
  setcount(data: any) {
    this.count = data;
  }

  getcount() {
    return this.count;
  }
  addNewSignUp(signUpData: SignUp): Observable<SignUp> {
    return this.http.post<SignUp>(this.signupUrl, signUpData);
  }
  // userLogin(loginData: Login): Observable<Login> {
  //   return this.http.post<Login>(this.loginUrl, loginData);
  // }
  userLogin(loginData: Login): Observable<Login> {
    return this.http.post<Login>(this.loginUrl, loginData);
  }
  addNewUser(newUserData: User): Observable<User> {
    return this.http.post<User>(this.adduserUrl, newUserData);
  }

  addFood(addFoodData: AddFood): Observable<AddFood> {
    return this.http.post<AddFood>(this.addFoodUrl, addFoodData);
  }
  viewFood(userid: string): Observable<ViewFood[]> {
    const url = `${this.viewFoodUrl}${userid}`;
    return this.http.get<ViewFood[]>(url);
  }
  foodDetails(foodname: string, userid: string): Observable<FoodDetails> {
    const url = `${this.FoodDetailsUrl}${foodname}/${userid}`;
    console.log('Request URL:', url);
    return this.http.get<FoodDetails>(url);
  }

  // dFood(userid: string,CreatedOn:Date): Observable<ViewFood> {
  //   const url = `${this.viewFoodUrl}${userid}`;
  //   return this.http.get<ViewFood>(url);
  // }

  deleteview(userid: string, CreatedOn: Date): Observable<ViewFood> {
    const url = `${this.deleteviewUrl}${userid}/${CreatedOn}`;
    return this.http.get<ViewFood>(url);
  }
  delete(userid: string, CreatedOn: Date): Observable<ViewFood> {
    const url = `${this.deleteUrl}${userid}/${CreatedOn}`;
    console.log(userid);
    console.log(CreatedOn);
    console.log(url);
    return this.http.get<ViewFood>(url);
  }
  filter(userid: string, no: number): Observable<ViewFood> {
    const url = `${this.filterviewUrl}${userid}/${no}`;
    console.log('url' + url);
    return this.http.get<ViewFood>(url);
  }

  fetchUser1(userid: string): Observable<User> {
    const url = `${this.fetchuserUrl1}${userid}`;
    return this.http.get<User>(url);
  }
  updateUser(updateUserData: User): Observable<User> {
    return this.http.post<User>(this.updateuserUrl, updateUserData);
  }
  fetchUser2(userid: string): Observable<FetchUser> {
    const url = `${this.fetchuserUrl}${userid}`;
    return this.http.get<FetchUser>(url);
  }
  consumed(userid: string): Observable<Consumed> {
    const url = `${this.caloriesconsumedUrl}${userid}`;
    return this.http.get<Consumed>(url);
  }
  logout() {
    this.clearSession();
    localStorage.removeItem('session');
    this.router.navigateByUrl('/');
  }
}
