import { ViewEncapsulation, Component, OnInit, ViewChild } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { invoices } from '../invoice/products';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'history-grid',
    styleUrls: ['../invoice/all.css'],
    encapsulation: ViewEncapsulation.None,
    template: `
    <div class="wrapper">
    <section class="card no-transition mr-auto ml-auto" style="width: 80%;">
      <div class="card-body">
        <div class="page-header">    
            <div class="row">                
                <div class="col-lg-12 col-sm-12">
        <kendo-grid
          [data]="gridView"
          [pageSize]="pageSize"
          [skip]="skip"
          [filter]="state.filter"
          [sortable]="{ allowUnsort: true, mode: 'multiple' }"
          [sort]="sort"
          (sortChange)="sortChange($event)" 
          filterable="menu"
          [pageable]="true"
          (pageChange)="pageChange($event)">
          <kendo-grid-messages pagerItemsPerPage="Invoices" pagerItems="Invoices"></kendo-grid-messages>
            <ng-template kendoGridToolbarTemplate>
                <div id="invoice_table">
                    <div id="row">
                        <div id="left"></div>
                        <div id="middle"></div>
                        <div id="right" class="pull-right text-right" style="height: 40px;">
                            <span class="control-label pull-left" for="CreditCard">Export Format:</span>
                            <button kendoGridPDFCommand class="btn btn-neutral" title="Export to PDF"><i class='fa fa-file-pdf-o' style="font-size: 1.25rem"></i></button>
                            <button kendoGridExcelCommand class="btn btn-neutral" title="Export to Excel"><i class='fa fa-file-excel-o' style="font-size: 1.25rem"></i></button>
                        </div>
                    </div>
                    <div id="row" class="runningTotal">
                        <div id="left" class="text-right text-nowrap" style="width: 350px; max-width: 350px;">
                            <!--<span class="control-label pull-left" for="CreditCard">CC#:</span>
                            <select class="form-control" name="CreditCard" style="width: 250px;">
                                <option value="** 1234">My BofA Credit Card - ** 1234</option>
                                <option value="** 4321">My Chase Checking Card - ** 4321</option>
                                <option value="** 4334">Tom's Gold AmEx Card - ** 4334</option>
                            </select>-->
                        </div>  
                        <div id="middle">                            
                        </div>
                        <div id="right" class="text-right mw-100">
                        </div>
                    </div>
                </div>
            </ng-template>

            <kendo-grid-column field="InvoiceReference" title="Ref. #"></kendo-grid-column>
            <kendo-grid-column field="ContactName" title="Name"></kendo-grid-column>
            <kendo-grid-column field="AttentionName" title="Attn To"></kendo-grid-column>
            <kendo-grid-column field="CustomerReference" title="Cust. Ref."></kendo-grid-column>
            <kendo-grid-column field="InvoiceDate" title="Date" filter="date" format="{0:d}" width='120px'></kendo-grid-column>            
            <kendo-grid-column field="OrderNumber" title="File No."></kendo-grid-column>            
            <kendo-grid-column field="ReferenceData" title="Ref. Data"></kendo-grid-column>
            <kendo-grid-column field="OriginalInvoiceAmount" title="Amount" filter="numeric" format="{0:c}"></kendo-grid-column>
            <kendo-grid-messages pagerItemsPerPage="Invoices"></kendo-grid-messages> 
            <div class="noExport" *kendoGridDetailTemplate="let dataItem">
              <invoice-details [details]="dataItem.Charges"></invoice-details>
            </div>            
            
            <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
                <div id="invoice_table">
                    <div id="row">
                        <div id="left" class="pull-left"><kendo-pager-info></kendo-pager-info></div>
                        <div id="middle"><div class="page-sizes"><kendo-pager-page-sizes [pageSizes]="[5, 10, 25, 50]" title="Invoices"></kendo-pager-page-sizes></div></div>
                        <div id="right" class="pull-right">
                            <kendo-pager-prev-buttons></kendo-pager-prev-buttons>
                            <kendo-pager-numeric-buttons [buttonCount]="10"></kendo-pager-numeric-buttons>
                            <kendo-pager-next-buttons></kendo-pager-next-buttons>
                        </div>
                    </div>
                </div>
            </ng-template>

            <kendo-grid-pdf fileName="History.pdf" [allPages]="true" paperSize="Letter" [repeatHeaders]="true" [landscape]="true">
              <kendo-grid-pdf-margin top="2cm" left="1cm" right="1cm" bottom="2cm"></kendo-grid-pdf-margin>
                <kendo-grid-column  field="ContactName" title="Name"></kendo-grid-column>
                <kendo-grid-column field="AttentionName" title="Attn To"></kendo-grid-column>
                <kendo-grid-column field="CustomerReference" title="Cust. Ref."></kendo-grid-column>
                <kendo-grid-column field="InvoiceDate" title="Date" format="{0:d}"></kendo-grid-column>
                <kendo-grid-column field="InvoiceReference" title="Ref. #"></kendo-grid-column>
                <kendo-grid-column field="OrderNumber" title="File No."></kendo-grid-column>
                <kendo-grid-column field="OriginalInvoiceAmount" title="Amount"></kendo-grid-column>
                <kendo-grid-column field="ReferenceData" title="Ref. Data"></kendo-grid-column>
                <ng-template kendoGridPDFTemplate let-pageNum="pageNum" let-totalPages="totalPages">
                <div class="page-template">
                  <div class="footer">
                    Page {{ pageNum }} of {{ totalPages }}
                  </div>
                </div>
              </ng-template>
            </kendo-grid-pdf>
            <kendo-grid-excel fileName="History.xlsx">
                <kendo-excelexport-column field="ContactName" title="Bill To Company"></kendo-excelexport-column>
                <kendo-excelexport-column field="AttentionName" title="Bill To Attention"></kendo-excelexport-column>
                <kendo-excelexport-column field="CustomerReference" title="Customer Reference"></kendo-excelexport-column>
                <kendo-excelexport-column field="InvoiceDate" title="Invoice Date" format="{0:d}"></kendo-excelexport-column>
                <kendo-excelexport-column field="InvoiceReference" title="Invoice Ref. #"></kendo-excelexport-column>
                <kendo-excelexport-column field="OrderNumber" title="File No."></kendo-excelexport-column>
                <kendo-excelexport-column field="OriginalInvoiceAmount" title="Invoice Amount"></kendo-excelexport-column>
                <kendo-excelexport-column field="ReferenceData" title="Reference Data"></kendo-excelexport-column>
            </kendo-grid-excel>
        </kendo-grid>
        </div>
        </div>
        </div>
        </div>
    `
})

export class HistoryComponent {

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
        this.sort = [{ field: "ContactName", dir: "asc" }, { field: "InvoiceDate", dir: "desc" }];
        this.invoices = orderBy(this.invoices, this.sort);
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

}
