import { ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

// Componentes
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { DefaultComponent} from './components/default/default.component';
import { FirmaComponent } from './components/firma/firma.component';
import { JornadasComponent } from './components/jornadas/jornadas.component';
import { AllJornadasComponent } from './components/all-jornadas/all-jornadas.component';

import { UsersListComponent } from './components/users-list/users-list.component';
import { UserPerfilComponent } from './components/user-perfil/user-perfil.component';
import { ArchivosComponent } from './components/archivos/archivos.component';

import { GraficosComponent } from './components/graficos/graficos.component';
import { GraficosAdminComponent } from './components/graficos-admin/graficos-admin.component';

import { Error404Component } from './components/error404/error404.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UsersActivateComponent } from './components/users-activate/users-activate.component';
import { ArchivosAdminComponent } from './components/archivos-admin/archivos-admin.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { LogComponent } from './components/log/log.component';


const appRoutes: Routes = [
	{path : '', component: DefaultComponent},
	{path : 'home', component: DefaultComponent},
	{path : 'login' , component: LoginComponent},
	{path : 'logout/:sure' , component: LoginComponent},
	{path : 'registro', component : RegisterComponent},
	{path : 'fichar', component : FirmaComponent},
	{path : 'jornadas/:id', component : JornadasComponent},
	{path : 'todas_jornadas', component : AllJornadasComponent},
	{path : 'usuarios', component : UsersListComponent},
	{path : 'perfil/:id', component : UserPerfilComponent},
	{path : 'archivos', component : ArchivosComponent},
	{path : 'graficos', component : GraficosComponent},
	{path : 'graficos_administrador', component : GraficosAdminComponent},
	{path : 'crear', component : UserCreateComponent},
	{path : 'activar', component : UsersActivateComponent},
	{path : 'exportar', component : ArchivosAdminComponent},
	{path : 'calendario', component : CalendarioComponent},
	{path : 'error/:code', component : Error404Component },
	{path : 'log', component : LogComponent},
	{path: '**', component: DefaultComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);