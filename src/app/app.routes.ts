import { Routes } from '@angular/router';
import{ TrainingsComponent } from './components/trainings/trainings-component';
import { OrderComponent } from './components/orders/order-component/order-component';
import { CustomerComponent } from './components/customer/customer-component/customer-component';
import { NotFoundComponent } from './components/not-found/not-found-component/not-found-component';
import { CartComponent } from './components/cart/cart-component/cart-component';
import { UserComponent } from './components/user/user-component';

export const routes: Routes = [
  {path : 'trainings', component : TrainingsComponent}, // Affiche le composant TrainingComponent quand l'URL est /trainings
  {path : 'cart', component : CartComponent}, // Affiche le composant CartComponent lorsque l'URL est /cart
  {path : 'order', component : OrderComponent}, // Affiche le composant OrderComponent lorsque l'URL est /order
  {path : 'customer', component : CustomerComponent}, // Affiche le composant CustomerComponent lorsque l'URL est /customer
  {path : 'user', component : UserComponent}, // Affiche le composant UserComponent lorsque l'URL est /user
  {path : '', redirectTo: 'trainings', pathMatch: 'full'}, // Si l'URL est vide (/), refirige vers /trainings
  {path : '404', component: NotFoundComponent}, // Affiche le composant NotFoundComponent pour /404
  {path : '**', redirectTo: '/404'} // Gère toutes les URL non définies et les redirige vers /404
];
