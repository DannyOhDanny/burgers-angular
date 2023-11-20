import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClient, HttpClientModule,} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [HttpClientModule, BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
