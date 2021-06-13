import { CommonModule } from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatButtonModule,
    MatDialogModule,
    MatDialogRef,
    MatInputModule,
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { configureTestSuite } from "ng-bullet";
import employeesData from "src/assets/mockups/employee/get-all.json";

import { EmployeeDialogComponent } from "./employee-dialog.component";

describe("GIVEN EmployeeDialogComponent", () => {
    let component: EmployeeDialogComponent;
    let fixture: ComponentFixture<EmployeeDialogComponent>;
    const MatDialogRefStub = {
        close: jasmine.createSpy("close"),
    };

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatDialogModule,
                MatButtonModule,
                MatInputModule,
            ],
            declarations: [EmployeeDialogComponent],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: MatDialogRefStub,
                },
            ],
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmployeeDialogComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("SHOULD create", () => {
        expect(component).toBeTruthy();
    });

    it("SHOULD disable accept button WHEN form is not valid", () => {
        component.newEmployeeForm.controls.firstNameFormControl.setValue(null);
        component.newEmployeeForm.controls.lastNameFormControl.setValue(null);
        component.newEmployeeForm.controls.ssnFormControl.setValue(null);
        component.newEmployeeForm.controls.phoneFormControl.setValue("test");
        fixture.detectChanges();

        const btnAccept: HTMLElement =
            fixture.nativeElement.querySelector(".btn-accept");
        expect(btnAccept.hasAttribute("disabled")).toBeTruthy();
    });

    it("SHOULD enable accept button WHEN box code field is filled", () => {
        component.newEmployeeForm.controls.firstNameFormControl.setValue(
            employeesData[0].FirstName
        );
        component.newEmployeeForm.controls.lastNameFormControl.setValue(
            employeesData[0].LastName
        );
        component.newEmployeeForm.controls.ssnFormControl.setValue(
            employeesData[0].SocialSecurityNumber
        );
        component.newEmployeeForm.controls.phoneFormControl.setValue(
            employeesData[0].Phone
        );
        fixture.detectChanges();

        const btnAccept: HTMLElement =
            fixture.nativeElement.querySelector(".btn-accept");
        expect(btnAccept.hasAttribute("disabled")).toBeFalsy();
    });

    it("SHOULD close dialog WHEN accept button is clicked", () => {
        component.newEmployeeForm.controls.firstNameFormControl.setValue(
            employeesData[0].FirstName
        );
        component.newEmployeeForm.controls.lastNameFormControl.setValue(
            employeesData[0].LastName
        );
        component.newEmployeeForm.controls.ssnFormControl.setValue(
            employeesData[0].SocialSecurityNumber
        );
        component.newEmployeeForm.controls.phoneFormControl.setValue(
            employeesData[0].Phone
        );
        fixture.detectChanges();

        const btnAccept: HTMLElement =
            fixture.nativeElement.querySelector(".btn-accept");
        btnAccept.click();
        fixture.detectChanges();

        expect(component.dialogRef.close).toHaveBeenCalled();
    });
});
