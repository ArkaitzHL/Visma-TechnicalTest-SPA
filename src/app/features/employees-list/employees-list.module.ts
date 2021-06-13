import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployeesListComponent } from "./employees-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
} from "@angular/material/";
import { EmployeeService } from "src/app/core/services/employee/employee.service";
import { EmployeeDialogComponent } from "./employee-dialog/employee-dialog.component";
import { EmployeeDialogModule } from "./employee-dialog/employee-dialog.module";

const routes = [
    {
        path: "",
        component: EmployeesListComponent,
    },
];

@NgModule({
    declarations: [EmployeesListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatSnackBarModule,
        MatButtonModule,
        EmployeeDialogModule,
    ],
    providers: [EmployeeService],
    entryComponents: [EmployeeDialogComponent],
})
export class EmployeeListModule {}
