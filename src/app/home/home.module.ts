import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [UserService],
  declarations: [HomeComponent]
})
export class HomeModule { }