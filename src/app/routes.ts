import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { AdminComponent } from "./admin/admin.component";
import { ApplicationsconfirmationComponent } from "./applicationsconfirmation/applicationsconfirmation.component";
import { GeneralErrorMessageComponent } from "./general-error-message/general-error-message.component";

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
    {
        path: 'confirmation',
        component: ApplicationsconfirmationComponent,
        title: "Applications Confirmation Page",
    },
    { 
        path: 'error', 
        component: GeneralErrorMessageComponent,
        title: "Error Page",},
];

export default routeConfig;