import {Injectable , OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {User} from '../models/user';

@Injectable()

export class UserService {
	public url:string;
	public identity;
	public token;

	constructor( private _http: HttpClient
		){
		this.url = GLOBAL.url;
	}

	/*ngOnInit(){
		//this.url = GLOBAL.url;
		this._http = new HttpClient();
	}*/

	pruebas(){
		return 'Hola mundo!';
	}

	register(user) : Observable<any>{
		let json = JSON.stringify(user);
		let params = 'json='+json;

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this._http.post(this.url+'register',params,{headers : headers});
	}

	signup(user ,gettoken = null) : Observable<any>{
		if (gettoken != null){
			user.gettoken = 'darmelodatos';
		}

	let json = JSON.stringify(user);
		let params = 'json='+json;

		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
		return this._http.post(this.url+'login',params,{headers : headers});
	}

	getIdentity(){
		let identity = localStorage.getItem('identity');  // estaba antes con el json parse y no me iba bien

		if (identity != "undefined"){
			this.identity  = JSON.parse(identity);
		}else{
			this.identity = null;
		}

		return this.identity;
	}
	getToken(){
		let token = localStorage.getItem('token');

		if (token != "undefined"){
			this.token  = token;
		}else{
			this.token = null;
		}

		return this.token;
	}

}