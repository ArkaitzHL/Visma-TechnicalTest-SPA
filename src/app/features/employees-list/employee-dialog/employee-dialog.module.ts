import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
} from "@angular/material";
import { EmployeeDialogComponent } from "./employee-dialog.component";

@NgModule({
    declarations: [EmployeeDialogComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
    ],
    exports: [EmployeeDialogComponent],
})
export class EmployeeDialogModule {}
