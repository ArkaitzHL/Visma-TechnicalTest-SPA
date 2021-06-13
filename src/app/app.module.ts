import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EmployeeListModule } from "./features/employees-list/employees-list.module";
import { MainPageComponent } from "./features/main-page/main-page.component";
import { MaterialModule } from "./material.module";
import { HeaderComponent } from "./navigation/header/header.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [AppComponent, MainPageComponent, HeaderComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        EmployeeListModule,
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
