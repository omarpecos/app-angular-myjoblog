import { Component,DoCheck, OnInit } from '@angular/core';
import { Router , ActivatedRoute , Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { JourneyService } from '../../services/journey.service';

import {GLOBAL} from './../../services/global';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-jornadas',
  templateUrl: './jornadas.component.html',
  styleUrls: ['./jornadas.component.css'],
  providers: [UserService, JourneyService]
})
export class JornadasComponent implements DoCheck {
	public url;
	public title: string = 'Mis Jornadas';
	public token;
	public identity;
	public journeys: any[];
  public myapp: AppComponent;

  public getParams:string = '';
  public pageInfo:any;
  public order = 'desc';
  public order_now = 'asc';
  public sort_by = 'id';

  public searchselect:any  = 'date';
  public theid;

  constructor(
  			private _route : ActivatedRoute,
			private _router : Router,
			private _userService: UserService,
			public _journeyService : JourneyService
  	) { 
        this.url = GLOBAL.baseUrl;
  			this.token = this._userService.getToken();
  			this.identity = this._userService.getIdentity();

         this._route.params.subscribe(
            params=>{
                this.theid = +params['id'];
              
               this.getJourneysofOne(this.theid);

      });
  			
  	}

  getJourneysofOne(id){
    this._journeyService.getMyJourneys(id,this.token,this.getParams).subscribe(
              response =>{
                if (response.status == 'success'){
                  ////console.log("MyJourneys response ->"+response);
                  this.journeys = response.journeys.data;

                   let pageInfo = {'page':response.journeys.current_page,'lastpage':response.journeys.last_page,
                  'previous':response.journeys.prev_page_url,'next':response.journeys.next_page_url,
                  'from':response.journeys.from,'to':response.journeys.to,'total':response.journeys.total};
                  this.pageInfo = pageInfo;

                   //sacar el order 
                  if (response.order == 'asc'){
                      this.order = 'desc';
                  }
                  if (response.order == 'desc'){
                      this.order = 'asc';
                  }
                  this.order_now = response.order;
                  this.sort_by = response.sort_by;
                }
                else{
                  // no tiene de la busqueda ?? 
                    this.journeys = [];
                }
              },
              error =>{
                let code = error.error.code;
                  console.log("$$$ - Error - $$$ -> "+<any>code);

          // Si el error es 403 (sin auto) o 401 (sin autenticar)
             if (code != 400){
                this._router.navigate(['error',code]);
              }
              }
            );
  } 

  ngOnInit() {
  		//console.log("jornada component de user "+this.identity.name+" cargadas ok");
  }

   ngDoCheck(){
	   this.identity = this._userService.getIdentity();
	   this.token = this._userService.getToken(); 
  }

  // AÑADE LOS PARÁMETROS A LA URL CUANDO ES NECESARIO
  addgetParams(value, operacion){
        var result;
          //console.log("getParams -- lo recibido ->" + value);

                //no se necesita cortar las url - lo que se pasa se añade a la url
               if (operacion == 'add'){
                      result = value;
                  }
                //sse corta la url desde el ? y se añade
               if (operacion == 'slice'){
                      var n = value.indexOf("?");
                      result = value.slice(n+1,value.length); 
                }

                //se recogen los parametros de el form de busqueda
               if (operacion == 'search'){

                  if (this.searchselect == 'date'){

                      var diasinput = $("#diasinput").val();
                      var mesinput = $("#mesinput").val();
                      var anioinput = $("#anioinput").val();

                      //console.log("diasinput"+diasinput+"mesinput"+mesinput+"anioinput"+anioinput);
                      var mystring;

                         // dia, mes y año
                        if (diasinput != '' && mesinput != '' && anioinput != '' ){
                             diasinput = diasinput > 9 ? "" + diasinput: "0" + diasinput;
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = anioinput+'-'+mesinput+'-'+diasinput;
                        }
                        // mes y año
                        if (diasinput == '' && mesinput != '' && anioinput != '' ){
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = anioinput+'-'+mesinput;
                        }
                        // mes y dia
                        if (diasinput != '' && mesinput != '' && anioinput == '' ){
                            diasinput = diasinput > 9 ? "" + diasinput: "0" + diasinput;
                            mesinput =  mesinput > 9 ? "" + mesinput: "0" + mesinput;
                            mystring = mesinput+'-'+diasinput;
                        }

                        //solo año
                        if (diasinput == '' && mesinput == '' && anioinput != '' ){
                            mystring = anioinput+'-';
                        }
                        //solo mes
                        if (diasinput == '' && mesinput != '' && anioinput == '' ){
                            mystring = '-'+mesinput+'-';
                        }
                        //solo dia
                        if (diasinput != '' && mesinput == '' && anioinput == '' ){
                            mystring = '-'+diasinput;
                        }

                           result = 'search='+mystring+'&field='+this.searchselect;
                           //console.log("result es --> "+result);

                  }

                  if (this.searchselect == 'time'){
                      var selectedtipohora = $("#selecttipohora").val();    
                      var horasinput = $("#horasinput").val();
                      var minutosinput = $("#minutosinput").val();
                          
                          horasinput = horasinput > 9 ? "" + horasinput: "0" + horasinput;
                           minutosinput =  minutosinput > 9 ? "" +minutosinput: "0" + minutosinput;
                     
                      var mystring;

                         //console.log("horas es --> "+horasinput+" y los min son ->"+minutosinput);

                        // hora y minutos
                        if (horasinput != '0' && minutosinput != '0' ){
                            
                            mystring = horasinput+':'+minutosinput+':';
                        }

                        //solo horas
                       if (horasinput != '0' && minutosinput == '0' ){
                            mystring = horasinput+':';
                        }
                        //solo minutos
                        if (horasinput == '0' && minutosinput != '0' ){
                            mystring = ':'+minutosinput+':';
                        }

                           result = 'search='+mystring+'&field='+selectedtipohora;
                           //console.log("result es --> "+result);

                  }

                      

                     
                }

                if (operacion == 'sorted_search'){
                  var selectfield = $("#selectfield").val();
                  var selectorder = $("#selectorder").val();

                   result = this.getParams+'&sort_by='+selectfield+'&order='+selectorder;
                }

          //console.log(" getParams --lo transformado ->" + result);

            if (operacion == 'search'){
                 this.getParams = result;
                 //console.log("this.getParams _>"+this.getParams);
            }
            else{
              this.getParams = result;
              //console.log("this.getParams _>"+this.getParams);
               
                 // si es la pag sig o anteroir que haga ElScrollTop
                    if (operacion == 'slice'){
                        AppComponent.myapp.scrollToTop();
                    }

                //
                //console.log("THIS.THEID >>>>>>>>>>>> "+this.theid);
               this.getJourneysofOne(this.theid);     
            }
    }

  // cambia el buscador de modo fecha xx/xx/xxxx a modo hora xx:xx
  viewSearchSelect(){

      var value = $("#selectsearch").val();
        ////console.log("value -> "+value);
      this.searchselect = value;
  
  }


/*//  A ESTO NO LE ECHES CUENTA !!!!!!!!!!!!!!!!!!
  // getImage()

  getImage(){
    this._journeyService.getImage('f8-1561385730.png',this.token).subscribe(
          response =>{
              return response;
          },
          error =>{
           //console.log(<any>error);
          }
      );
  }*/

}
