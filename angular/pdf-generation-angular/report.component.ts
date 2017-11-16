import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IMultiSelectOption } from '@app/shared/dropdown/types';
import { ReportService } from '@app/admin/report/report.services';
import * as jsPDF from 'jspdf';
import * as jsPDFAutoTable from 'jspdf-autotable';

@Component({
    selector: 'app-report',
    templateUrl: 'report.component.html'
})

export class ReportComponent implements OnInit {

    subCategoryOptions: Array<any>;

    selectedSubCategories: string[];

    subCategoryModel = {
        customerList: [],
        driverList: [],
        rideList: ['running', 'completed'],
        transactionList: []
    };

    showSubCategory: boolean;

    reportForm: FormGroup;

    constructor(private fb: FormBuilder, private reportService: ReportService) {
        this.showSubCategory = false;
    }

    ngOnInit() {
        this.createForm();
     }

    createForm() {
        this.reportForm = this.fb.group({
            reportCategory: ['customerList'],
            subCategory: ['']
        });
        this.renderSubCategories();
    }

    renderSubCategories() {
        const category = this.reportForm.get('reportCategory').value;
        const SubCat = this.subCategoryModel[category].map((subCateg, index) => {
            return { id: index + 1, name: subCateg };
        });
        this.subCategoryOptions = SubCat;
        this.subCategoryOptions = this.subCategoryOptions.concat();
    }

    onChange(e) {

    }

    onSubmit() {
        this.reportService.getDriverList(4, '').subscribe({
            next: (result: any) => {
                console.log(result.data);
                this.makePdf(result.data.rows);
            }
        });
    }

    makePdf(data) {
        const columns = ['ID', 'Name', 'Address'];
        const rows = data.map((row) => {
            const internalArray = [row.id, row.name, row.address].map((val) => {
                return sanitizeInput(val);
            });
            return internalArray;

            function sanitizeInput(val) {
                return val ? val : '';
            }
        });
        const doc =  new jsPDF('p', 'pt');
        jsPDFAutoTable;
        doc.autoTable(columns, rows);
        doc.save('table.pdf');
    }
}
