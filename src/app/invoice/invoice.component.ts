import { ViewEncapsulation, Component, OnInit, ViewChild } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { invoices } from './products';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';

@Component({
    selector: 'invoice-grid',
    template: `
    <div class="main">
        <div class="section text-center">
        <div class="container">
        <div class="row">
        <kendo-grid
          [data]="gridView"
          [pageSize]="pageSize"
          [skip]="skip"
          [filter]="state.filter"
          (dataStateChange)="dataStateChange($event)"
          [sortable]="{ allowUnsort: true, mode: 'multiple' }"
          [sort]="sort"
          (sortChange)="sortChange($event)"
          filterable="menu"
          [pageable]="true"
          (pageChange)="pageChange($event)" >
            <ng-template kendoGridToolbarTemplate>
                <div class="action-buttons">
                    <button kendoGridPDFCommand class="k-pdf pull-right"><span class='fa fa-file-pdf-o'></span>&nbsp;Export to PDF</button>
                    <button kendoGridExcelCommand class="btn-pdf pull-right"><span class='fa fa-file-excel-o'></span>&nbsp;Export to Excel</button>
                    <button class="k-btn k-btn-primary">Pay Selected</button>
                </div>
            </ng-template>

            <kendo-grid-column field="ContactName" title="Bill To Company" [headerStyle]="{'font-size': '.7em'}" [style]="{'font-size': '.7em'}"></kendo-grid-column>
            <kendo-grid-column field="AttentionName" title="Bill To Attention" [headerStyle]="{'font-size': '.7em'}" [style]="{'font-size': '.7em'}"></kendo-grid-column>
            <kendo-grid-column field="CustomerReference" title="Customer Reference" [headerStyle]="{'font-size': '.7em'}" [style]="{'font-size': '.7em'}"></kendo-grid-column>
            <kendo-grid-column field="InvoiceDate" title="Invoice Date" filter="date" format="{0:d}" [headerStyle]="{'font-size': '.7em'}" [style]="{'font-size': '.7em'}"></kendo-grid-column>
            <kendo-grid-column field="InvoiceReference" title="Invoice Ref. #" [headerStyle]="{'font-size': '.7em'}" [style]="{'font-size': '.7em'}"></kendo-grid-column>
            <kendo-grid-column field="OrderNumber" title="File No." [headerStyle]="{'font-size': '.7em'}" [style]="{'font-size': '.7em'}"></kendo-grid-column>
            <kendo-grid-column field="CurrentBalance" title="Invoice Amount" [headerStyle]="{'font-size': '.7em'}" format="{0:c}" [style]="{'font-size': '.7em'}"></kendo-grid-column>
            <kendo-grid-column field="ReferenceData" title="Reference Data" [headerStyle]="{'font-size': '.7em'}" [style]="{'font-size': '.7em'}"></kendo-grid-column>

            <kendo-grid-column field="Discontinued" [headerStyle]="{'font-size': '.7em'}" title="Pay" width="45" [filterable]="false">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <input type="checkbox" [checked]="dataItem.Discontinued"/>
                </ng-template>
            </kendo-grid-column>

            <ng-template kendoGridDetailTemplate let-dataItem >
              <section *ngIf="dataItem.Charges">
                <kendo-grid-column field="item.TransactionDescription" title="Description" [headerStyle]="{'font-size': '.7em'}" [style] = "{'font-size': '.7em'}"> </kendo-grid-column>
                <kendo-grid-column field="item.ChargeAmount" title="Amount" [headerStyle]="{'font-size': '.7em'}" [style]="{'font-size': '.7em'}"> </kendo-grid-column>
              </section>
            </ng-template>
            
            <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
               <div class="pager-prev-next"><kendo-pager-prev-buttons></kendo-pager-prev-buttons>
               <kendo-pager-numeric-buttons [buttonCount]="10"></kendo-pager-numeric-buttons>
               <kendo-pager-next-buttons></kendo-pager-next-buttons></div>
               <div class="page-sizes"><kendo-pager-page-sizes [pageSizes]="[5, 10, 40]"></kendo-pager-page-sizes></div>
               <div class="pager-info"><kendo-pager-info></kendo-pager-info></div>
            </ng-template>

            <kendo-grid-pdf fileName="Invoices.pdf" [allPages]="true" paperSize="Letter" [repeatHeaders]="true" [landscape]="true">
              <kendo-grid-pdf-margin top="2cm" left="1cm" right="1cm" bottom="2cm"></kendo-grid-pdf-margin>
                <kendo-grid-column  field="ContactName" title="Bill To Company" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="AttentionName" title="Bill To Attention" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="CustomerReference" title="Customer Reference" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="InvoiceDate" title="Invoice Date" format="{0:d}" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="InvoiceReference" title="Invoice Ref. #" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="OrderNumber" title="File No." [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="CurrentBalance" title="Invoice Amount" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="ReferenceData" title="Reference Data" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <ng-template kendoGridPDFTemplate let-pageNum="pageNum" let-totalPages="totalPages">
                <div class="page-template">
                  <div class="footer">
                    Page {{ pageNum }} of {{ totalPages }}
                  </div>
                </div>
              </ng-template>
            </kendo-grid-pdf>
            <kendo-grid-excel fileName="Products.xlsx">
                <kendo-excelexport-column  field="ContactName" title="Bill To Company"></kendo-excelexport-column>
                <kendo-excelexport-column field="AttentionName" title="Bill To Attention"></kendo-excelexport-column>
                <kendo-excelexport-column field="CustomerReference" title="Customer Reference"></kendo-excelexport-column>
                <kendo-excelexport-column field="InvoiceDate" title="Invoice Date" format="{0:d}"></kendo-excelexport-column>
                <kendo-excelexport-column field="InvoiceReference" title="Invoice Ref. #"></kendo-excelexport-column>
                <kendo-excelexport-column field="OrderNumber" title="File No."></kendo-excelexport-column>
                <kendo-excelexport-column field="CurrentBalance" title="Invoice Amount"></kendo-excelexport-column>
                <kendo-excelexport-column field="ReferenceData" title="Reference Data"></kendo-excelexport-column>
            </kendo-grid-excel>
        </kendo-grid></div></div></div>
    `,
    styleUrls: ['../../../node_modules/@progress/kendo-theme-bootstrap/dist/all.css'],
    encapsulation: ViewEncapsulation.None

})



export class InvoiceComponent implements OnInit {

    public pageSize: number = 10;
    public skip: number = 0;
    public sort: SortDescriptor[] = [];
    public gridView: GridDataResult;
    public invoices: any[] = invoices;
    @ViewChild(GridComponent) grid: GridComponent;

    public state: State = {
        // Initial filter descriptor
        filter: {
            logic: "and",
            filters: []
        }
    };

    constructor() {
        this.sort = [{ field: "AttentionName", dir: "asc" }, { field: "InvoiceDate", dir: "asc"}];
        this.loadProducts();
        this.sort = [];

    }

    public sliderChange(pageIndex: number): void {
        this.skip = (pageIndex - 1) * this.pageSize;
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.invoices = orderBy(this.invoices, this.sort);
        this.loadProducts();
    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadProducts();
    }

    private loadProducts(): void {

        this.gridView = {
            data: this.invoices.slice(this.skip, this.skip + this.pageSize),
            total: this.invoices.length
        };
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridView = process(invoices, this.state);
    }

    ngOnInit() {
        //Call the webservice to get the list of Invoices
    }

}
