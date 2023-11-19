import {Component} from '@angular/core';
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
  providers: [AppService, HttpClient,]
})

export class AppComponent {
  currency = '$';

  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  productsData: any;

  // productsData = [{
  //   image: '1.png',
  //   title: 'Бургер чеддер & бекон',
  //   text: 'Мы обновили наше меню, спешите попробовать сезонные новинки и насладиться отличным вкусом наших бургеров. Готовим для вас лучшие бургеры в городе из отборной мраморной говядины.',
  //   price: 8,
  //   basePrice: 8,
  //   grams: 360,
  // }, {
  //   image: '2.png',
  //   title: 'BBQ с беконом и курицей',
  //   text: 'Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ',
  //   price: 7,
  //   basePrice: 7,
  //   grams: 390,
  // }, {
  //   image: '3.png',
  //   title: 'Дабл биф бургер',
  //   text: 'Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук, соус бургер, горчица',
  //   price: 10,
  //   basePrice: 10,
  //   grams: 420,
  //
  // }, {
  //   image: '4.png',
  //   title: 'Баварский бургер',
  //   text: 'Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг',
  //   price: 7,
  //   basePrice: 7,
  //   grams: 220,
  // }, {
  //   image: '5.png',
  //   title: 'Бекон чизбургер',
  //   text: 'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень',
  //   price: 8,
  //   basePrice: 8,
  //   grams: 220,
  // }, {
  //   image: '6.png',
  //   title: 'Индиана бургер',
  //   text: 'Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
  //   price: 9,
  //   basePrice: 9,
  //   grams: 320,
  // }, {
  //   image: '7.png',
  //   title: 'Вегги бургер',
  //   text: 'Булочка для бургера, вегетарианская котлета, красный лук, сыр, свежий томат, соус барбекю, соус сырный, салат айсберг',
  //   price: 8,
  //   basePrice: 8,
  //   grams: 280,
  // }, {
  //   image: '8.png',
  //   title: 'Плаксивый Джо',
  //   text: 'Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень',
  //   price: 7,
  //   basePrice: 7,
  //   grams: 380,
  // }, {
  //   image: '9.png',
  //   title: 'Двойной чиз бургер',
  //   text: 'Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень',
  //   price: 11,
  //   basePrice: 11,
  //   grams: 400,
  // }, {
  //   image: '10.png',
  //   title: 'Фрешбургер',
  //   text: 'Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо, салями, соус барбекю, соус сырный, салат айсберг, свежий томат',
  //   price: 9,
  //   basePrice: 9,
  //   grams: 300,
  // }, {
  //   image: '11.png',
  //   title: 'Цуккини бургер',
  //   text: 'Булочка для бургера, вегетарианская котлета из нута, цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень',
  //   price: 8,
  //   basePrice: 8,
  //   grams: 320,
  // }, {
  //   image: '12.png',
  //   title: 'Двойной бургер чеддар',
  //   text: 'Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный, томат, кетчуп, двойной сыр чеддар, горчица, зелень',
  //   price: 9,
  //   basePrice: 9,
  //   grams: 360,
  // },];


  constructor(private fb: FormBuilder, private appService: AppService) {
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
