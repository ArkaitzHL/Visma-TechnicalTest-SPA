import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Employee } from "../../models/employee";
import { ConfigService } from "../config/config.service";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  constructor(private httpClient: HttpClient, private config: ConfigService) {}

	get(): Observable<Array<Employee>> {
		return this.httpClient.get<Array<Employee>>(this.config.endpoints.employees.root);
	}

	post(employee: Employee): Observable<string> {
		return this.httpClient.post<any>(this.config.endpoints.employees.root, employee);
	}
}
