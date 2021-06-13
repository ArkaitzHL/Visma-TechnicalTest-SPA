import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeesListComponent } from "./features/employees-list/employees-list.component";
import { MainPageComponent } from "./features/main-page/main-page.component";

const routes: Routes = [
    { path: "main-page", component: MainPageComponent },
    { path: "", redirectTo: "/main-page", pathMatch: "full" },
    { path: "employees", component: EmployeesListComponent },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
