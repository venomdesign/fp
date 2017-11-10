import { NgModule } from '@angular/core';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
//import { LoginComponent } from './login.component';
//import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';
import { FwssoComponent } from './fwsso/fwsso.component';
import { NfwssoComponent } from './nfwsso/nfwsso.component';
import { BlockedssoComponent } from './blockedsso/blockedsso.component';
import { NfnssoComponent } from './nfnsso/nfnsso.component';
import { FopsuserComponent } from './fopsuser/fopsuser.component';

@NgModule({
  imports: [ PagesRoutingModule ],
  declarations: [
    P404Component,
    P500Component,
    FwssoComponent,
    NfwssoComponent,
    BlockedssoComponent,
    NfnssoComponent,
    FopsuserComponent,
    //LoginComponent,
    //RegisterComponent
  ]
})
export class PagesModule { }
