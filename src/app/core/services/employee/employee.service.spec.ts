import { inject, TestBed } from "@angular/core/testing";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { EmployeeService } from "./employee.service";
import { ConfigService } from "../config/config.service";
import { configureTestSuite } from "ng-bullet";
import employeesData from "src/assets/mockups/employee/get-all.json";
import { Employee } from "../../models/employee";

describe("GIVEN EmployeeService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    class ConfigServiceStub {
        endpoints = {
            employees: {
                root: `/employees`,
            },
        };
    }

    configureTestSuite(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                EmployeeService,
                { provide: ConfigService, useClass: ConfigServiceStub },
            ],
        })
    );

    afterEach(inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
            httpMock.verify();
        }
    ));

    it("SHOULD be created", () => {
        const service: EmployeeService = TestBed.get(EmployeeService);
        expect(service).toBeTruthy();
    });

    it("SHOULD call GET service with success status", inject(
        [HttpTestingController, EmployeeService, ConfigService],
        (
            httpMock: HttpTestingController,
            employeeService: EmployeeService,
            configService: ConfigService
        ) => {
            employeeService.get().subscribe((data) => {
                expect(data.length).toBe(2);
            });

            const req = httpMock.expectOne(
                configService.endpoints.employees.root
            );
            expect(req.request.method).toEqual("GET");

            req.flush(employeesData);
        }
    ));

    it("SHOULD call POST service with success status", inject(
        [HttpTestingController, EmployeeService, ConfigService],
        (
            httpMock: HttpTestingController,
            employeeService: EmployeeService,
            configService: ConfigService
        ) => {
            const employee: Employee = employeesData[0];

            employeeService.post(employee).subscribe(() => {});

            const req = httpMock.expectOne(
                configService.endpoints.employees.root
            );
            expect(req.request.method).toEqual("POST");
        }
    ));
});
