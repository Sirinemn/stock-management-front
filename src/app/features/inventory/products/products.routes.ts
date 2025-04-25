import { Routes } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";

export const products_routes: Routes = [
    {title: 'Products', path: 'products-list', component: ProductListComponent },
    {title: 'Products', path: 'products/edit', component: ProductFormComponent },
    {title: 'Products', path: 'products/add', component: ProductFormComponent },
]