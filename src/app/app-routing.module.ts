import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ChatComponent } from './component/chat/chat.component';

const routes: Routes = [{path:'login',component:LoginComponent},{path:'chat',component:ChatComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
