import { Component } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { MatDialogRef } from "@angular/material";
import { Employee } from "src/app/core/models/employee";

@Component({
    selector: "app-employee-dialog",
    templateUrl: "./employee-dialog.component.html",
    styleUrls: ["./employee-dialog.component.scss"],
})
export class EmployeeDialogComponent {
    public newEmployeeForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<any>) {
        this.newEmployeeForm = this.createFormGroup();
    }

    createFormGroup(): FormGroup {
        return new FormBuilder().group({
            firstNameFormControl: new FormControl("", [Validators.required]),
            lastNameFormControl: new FormControl("", [Validators.required]),
            ssnFormControl: new FormControl("", [
                Validators.required,
                Validators.pattern(/^\d+$/),
            ]),
            phoneFormControl: new FormControl("", [
                Validators.pattern(/^\d+$/),
            ]),
        });
    }

    accept() {
        const employee = new Employee();
        employee.FirstName =
            this.newEmployeeForm.controls.firstNameFormControl.value;
        employee.LastName =
            this.newEmployeeForm.controls.lastNameFormControl.value;
        employee.SocialSecurityNumber =
            this.newEmployeeForm.controls.ssnFormControl.value;
        employee.Phone = this.newEmployeeForm.controls.phoneFormControl.value;

        this.dialogRef.close(employee);
    }
}
