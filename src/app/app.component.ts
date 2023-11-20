import {Component,  OnInit, HostListener} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppService} from "./app.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [AppService, HttpClient]
})

export class AppComponent implements OnInit{
  currency = '$';
  orderImageStyle: any;
  mainImageStyle:any;

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  productsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  // Движение изображения по движению мыши
@HostListener('document: mousemove', ['$event'])
onMouseMove(e:MouseEvent){
     this.orderImageStyle = {transform: 'translate(-' + ((e.clientX * 0.3) / 8) + 'px,-' + ((e.clientY * 0.3) / 8) + 'px)'};
     this.mainImageStyle = {transform: 'translate(-' + ((e.clientX * 0.3) / 8) + 'px,-' + ((e.clientY * 0.3) / 8) + 'px)'};

}

  ngOnInit() {
    this.appService.getData().subscribe(data => this.productsData = data);
  }

  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (burger) {
      this.form.patchValue({order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
    }
  };

  confirmOrder() {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value).subscribe({
          next: (response: any) => {
            alert(response.message);
            this.form.reset();
          },
          error: (response) => {
            alert(response.error.message);
          },
        }
      );
    }
  }


  changeCurrency() {
    let newCurrency = '$';

    let index = 1;

    if (this.currency === '$') {
      newCurrency = '₽';
      index = 90;
    } else if (this.currency === "₽") {
      newCurrency = 'Br';
      index = 3.29;
    } else if (this.currency === "Br") {
      newCurrency = '€';
      index = 0.92;
    } else if (this.currency === "€") {
      newCurrency = '¥';
      index = 149.5;
    } else if (this.currency === "¥") {
      newCurrency = '$';
      index = 1;
    }

    this.currency = newCurrency;

    this.productsData.forEach((item: any) => {
      item.price = +(item.basePrice * index).toFixed(2);
    })
  }

}
