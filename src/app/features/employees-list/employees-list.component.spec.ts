import { CommonModule } from "@angular/common";
import { ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
    MatButtonModule,
    MatCardModule,
    MatDialog,
    MatPaginatorModule,
    MatSnackBar,
    MatSnackBarModule,
    MatSortModule,
    MatTableDataSource,
    MatTableModule,
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { configureTestSuite } from "ng-bullet";
import { EmployeeService } from "src/app/core/services/employee/employee.service";
import { EmployeeDialogModule } from "./employee-dialog/employee-dialog.module";
import { EmployeesListComponent } from "./employees-list.component";
import employeesData from "src/assets/mockups/employee/get-all.json";
import { of } from "rxjs";

describe("GIVEN EmployeesListComponent", () => {
    let component: EmployeesListComponent;
    let fixture: ComponentFixture<EmployeesListComponent>;

    class EmployeeServiceStub {
        get() {
            return {
                pipe: () => {},
                subscribe: () => {},
            };
        }

        post() {
            return {
                pipe: () => {},
                subscribe: () => {},
            };
        }
    }

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
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
            declarations: [EmployeesListComponent],
            providers: [
                { provide: EmployeeService, useClass: EmployeeServiceStub },
            ],
        });
    });

    beforeEach(inject([EmployeeService], (employeeService: EmployeeService) => {
        fixture = TestBed.createComponent(EmployeesListComponent);
        component = fixture.componentInstance;

        spyOn(employeeService, "get").and.returnValue(of(employeesData));

        fixture.detectChanges();
    }));

    it("SHOULD create", () => {
        expect(component).toBeTruthy();
    });

    it("SHOULD return complete FormBuilder", () => {
        expect(component.employeeListForm).toBeDefined();
    });

    it("SHOULD return employees data", inject(
        [EmployeeService],
        (employeeService: EmployeeService) => {
            expect(employeeService.get).toHaveBeenCalled();
            expect(component.dataSource.data.length).toEqual(
                employeesData.length
            );
        }
    ));

    describe("WHEN create new button is clicked", () => {
        beforeEach(inject(
            [EmployeeService, MatDialog],
            (employeeService: EmployeeService, dialog: MatDialog) => {
                spyOn(dialog, "open").and.returnValue({
                    afterClosed: () => of(employeesData[1]),
                });
                spyOn(employeeService, "post").and.returnValue(
                    of("Employee inserted correctly.")
                );

                component.dataSource = new MatTableDataSource(employeesData);

                var btnCreate =
                    fixture.nativeElement.querySelector(`.btn-create`);
                btnCreate.click();

                fixture.detectChanges();
            }
        ));

        it("SHOULD show new employee dialog", inject(
            [MatDialog],
            (dialog: MatDialog) => {
                expect(dialog.open).toHaveBeenCalled();
            }
        ));

        it("SHOULD insert new employee", inject(
            [EmployeeService],
            (employeeService: EmployeeService) => {
                expect(employeeService.post).toHaveBeenCalled();
            }
        ));

        it("SHOULD show snackbar with success message", inject(
            [MatSnackBar],
            (snackBar: MatSnackBar) => {
                spyOn(snackBar, "open");
                expect(snackBar.open).not.toHaveBeenCalled();
            }
        ));
    });
});
