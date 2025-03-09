import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { AdminComponent } from "./admin/admin.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: "Home Page",
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: "Details Page",
    },
    {
        path: 'admin',
        component: AdminComponent,
        title: "Admin Page",
    },
];

export default routeConfig;