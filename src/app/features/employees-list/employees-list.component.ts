import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
    MatDialog,
    MatPaginator,
    MatSnackBar,
    MatSort,
    MatTableDataSource,
} from "@angular/material";
import { Employee } from "src/app/core/models/employee";
import { EmployeeService } from "src/app/core/services/employee/employee.service";
import { finalize } from "rxjs/internal/operators/finalize";
import { EmployeeDialogComponent } from "./employee-dialog/employee-dialog.component";

@Component({
    selector: "app-employees-list",
    templateUrl: "./employees-list.component.html",
    styleUrls: ["./employees-list.component.scss"],
})
export class EmployeesListComponent implements OnInit {
    //#region Private Variables
    employeeListForm: FormGroup;
    displayedColumns: string[] = [
        "FirstName",
        "LastName",
        "SocialSecurityNumber",
        "Phone",
    ];
    rows: Array<Employee> = [];
    dataSource: MatTableDataSource<Employee>;
    rowsLength: number;
    paginator: MatPaginator;
    @ViewChild(MatPaginator, { static: false }) set matPaginator(
        mp: MatPaginator
    ) {
        this.paginator = mp;
        this.setDataSourceAttributes();
    }

    sort: MatSort;
    @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
        this.sort = ms;
        this.setDataSourceAttributes();
    }
    //#endregion

    //#region Constructor
    constructor(
        private employeeService: EmployeeService,
        private cdRef: ChangeDetectorRef,
        private dialog: MatDialog,
        private snackbar: MatSnackBar
    ) {
        this.dataSource = new MatTableDataSource();
    }
    //#endregion

    //#region NG Methods
    ngOnInit() {
        this.employeeListForm = this.createEmployeeFormGroup();
        this.getEmployees();
    }
    //#endregion

    //#region Public Methods
    public getEmployees() {
        this.employeeService
            .get()
            .pipe(
                finalize(() => {
                    this.cdRef.detectChanges();
                })
            )
            .subscribe((data: Array<Employee>) => {
                if (data) {
                    this.rows = data;
                    this.dataSource = new MatTableDataSource(this.rows);
                }
            });
    }

    public createEmployee() {
        const dialogRef = this.dialog.open(EmployeeDialogComponent, {
            width: "650px",
        });

        dialogRef.afterClosed().subscribe((newEmployee) => {
            if (newEmployee) {
                this.employeeService
                    .post(newEmployee)
                    .pipe(
                        finalize(() => {
                            this.getEmployees();
                            this.cdRef.detectChanges();
                        })
                    )
                    .subscribe((data: any) => {
                        this.snackbar.open(
                            "Employee inserted correctly.",
                            null,
                            {
                                duration: 2500,
                            }
                        );
                    });
            }
        });
    }
    //#endregion

    //#region Private Methods
    private createEmployeeFormGroup() {
        return new FormBuilder().group({});
    }

    private setDataSourceAttributes() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    //endregion
}
