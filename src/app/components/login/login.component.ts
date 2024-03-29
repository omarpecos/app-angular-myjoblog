import {Component, OnInit} from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
	selector: 'login',
	templateUrl : './login.component.html',
	providers : [UserService]
})

export class LoginComponent implements OnInit{
	public title: string = 'Identifícate';
	public user:User;
	public token;
	public identity;
	public status:string;

	constructor(
			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService
		){
		//this.title = ;	
	}

	ngOnInit(){
		////console.log('login.component cargado correctamente !!');
		this.user =  new User(1, 'user','','','',0,'');
		this.logout();
		/*let user = this._userService.getIdentity();
		if (user!=null){
				//console.log(user.name+' '+ user.surname+' ->id = '+user.sub);
		}*/
	}

	onSubmit(form){
					//console.log("Al acceder el user ---->");
					//console.log(this.user);

		this._userService.signup(this.user).subscribe(
				response =>{
				

				if (response.status != 'error'){
							this.status = 'success';
							// conseguir el token
							this.token = response;
							localStorage.setItem('token',this.token);
							// objeto usuario identificado
							
							this._userService.signup(this.user,true).subscribe(
								response =>{
											//datos del user
											this.identity = response;
											localStorage.setItem('identity',JSON.stringify(this.identity));

											//redireccion
											this._router.navigate(['home']);
										},
										error =>{
											console.log(<any>error);
										}


							);
		}else{
			this.status = 'error';
				}
				error =>{
					console.log(<any>error);
				}
			}
			);
	}

	logout(){
		this._route.params.subscribe(
			params=>{
				let logout = +params['sure'];
				
				if (logout == 1){
					localStorage.removeItem('identity');
					localStorage.removeItem('token');

					this.identity = null;
					this.token = null;

							/*//Limpiar el datajson que se genera al iniciar una jornada o terminarla !!
							if (localStorage.getItem("datajson") != null) {
							  	localStorage.removeItem("datajson");
							}*/

					//redireccion
					this._router.navigate(['home']);
				}
		});
	}
}

