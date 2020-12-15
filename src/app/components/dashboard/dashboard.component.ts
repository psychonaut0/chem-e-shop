import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { FirebaseService } from '../../services/firebase.service';
import { Product } from '../../models/product';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  products: Product[];
  isLoading = false;
  submitted: boolean;
  reset = this.getData();


  constructor(private service: FirebaseService,
              private cart: CartService,
              private snackbar: MatSnackBar) { }

  getData(): void {
    this.isLoading = true;
    this.service.getProducts().pipe(take(1), ).subscribe(
      data => {
        console.log(data);
        this.products = data;

      },
      err => {
        console.error(err);
      },
      () => {
        this.isLoading = false;
        this.submitted = false;
      }

    );
  }

  addToCart(product): void {
    this.cart.addToCart(product);
    this.snackbar.open('Product added to cart!', '', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top'});
  }

  getSearch(value: string): void {
    const temp: Product[] = [];
    this.isLoading = true;
    this.service.getProducts().pipe(take(1), ).subscribe(
      data => {
        this.submitted = true;
        console.log(data);
        this.products = data;
        for ( const prod of this.products) {
          if (prod.name.toLowerCase().includes(value.toLowerCase())) {
            temp.push(prod);
          }
        }
        this.products = temp;

      },
      err => {
        console.error(err);
      },
      () => {
        this.isLoading = false;
      }

    );
  }

  ngOnInit(): void {
    this.getData();

  }

}
