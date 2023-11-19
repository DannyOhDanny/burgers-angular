import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule,} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from "./app.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [HttpClientModule, BrowserModule, ReactiveFormsModule],
  providers: [],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})

export class AppModule {
}
