import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {ReactiveFormsModule} from "@angular/forms";
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule, NgOptimizedImage],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
