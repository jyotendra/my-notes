import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { ReportComponent } from '@app/admin/report/report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from '@app/shared/dropdown/dropdown.module';
import { ReportService } from '@app/admin/report/report.services';

const reportRoutes: Routes = [
    { path: '', component: ReportComponent }
];

@NgModule({
    imports: [RouterModule.forChild(reportRoutes), ReactiveFormsModule,
        MultiselectDropdownModule],
    exports: [],
    declarations: [ReportComponent],
    providers: [ReportService],
})
export class ReportModule { }
