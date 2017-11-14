import { ViewEncapsulation, Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { process, State } from '@progress/kendo-data-query';
import { invoices } from './products';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
declare var jquery:any;
declare var $ :any;

@Component({
    selector: 'invoice-grid',
    styleUrls: ['all.css'],
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
          (dataStateChange)="dataStateChange($event)"
          [sortable]="{ allowUnsort: true, mode: 'multiple' }"
          [sort]="sort"
          (sortChange)="sortChange($event)"
          filterable="menu"
          [pageable]="true"
          (pageChange)="pageChange($event)">
          <kendo-grid-messages pagerItemsPerPage="Invoices" pagerItems="Invoices"></kendo-grid-messages>
            <ng-template kendoGridToolbarTemplate>
                <div class="action-buttons">
                    <button class="btn btn-primary upperView" (click)='PaySelected();' data-toggle="modal" data-target="#myModal">View Selected</button>
                   <div class="export-btns"><button kendoGridPDFCommand class="btn btn-outline-danger pull-right"><i class='fa fa-file-pdf-o'></i>&nbsp;Export to PDF</button>
                    <button kendoGridExcelCommand class="btn btn-outline-success pull-right"><i class='fa fa-file-excel-o'></i>&nbsp;Export to Excel</button></div>
                    <button class="btn btn-primary testMove" (click)='PaySelected();' data-toggle="modal" data-target="#myModal">View Selected</button>
                </div>
                <!--<div class="action-buttons">
                  <div class="pull-right">Invoices Selected: {{selCount}}&nbsp;&nbsp;Total: $ {{selTotal}}</div>
                </div>-->
            <div class="runningTotal text-right total_top"><div>Invoices: {{selCount}}&nbsp;&nbsp;Total Payment: $ {{selTotal}}</div></div>
            </ng-template>

            <kendo-grid-column field="ToPay" title="Pay" width="50" [filterable]="false">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" [(ngModel)]="dataItem.ToPay" [checked]="dataItem.ToPay" (ngModelChange)="UpdateTotal();" class="form-check-input">
                            <span class="form-check-sign"></span>
                        </label>
                    </div>
                </ng-template>
            </kendo-grid-column>
            <kendo-grid-column field="InvoiceReference" title="Ref. #"></kendo-grid-column>
            <kendo-grid-column field="ContactName" title="Name"></kendo-grid-column>
            <kendo-grid-column field="AttentionName" title="Attn To"></kendo-grid-column>
            <kendo-grid-column field="CustomerReference" title="Cust. Ref."></kendo-grid-column>
            <kendo-grid-column field="InvoiceDate" title="Date" filter="date" format="{0:d}" width='120px'></kendo-grid-column>
            
            <kendo-grid-column field="OrderNumber" title="File No."></kendo-grid-column>
            
            <kendo-grid-column field="ReferenceData" title="Ref. Data"></kendo-grid-column>
            <kendo-grid-column field="CurrentBalance" title="Amount" filter="numeric" format="{0:c}">
            <!--<ng-template kendoGridFooterTemplate let-column let-columnIndex="columnIndex">
                  <div class="pull-right">Invoices Selected: {{selCount}}&nbsp;&nbsp;Total: $ {{selTotal}}</div>
                </ng-template-->
</kendo-grid-column>
            <kendo-grid-messages pagerItemsPerPage="Invoices"></kendo-grid-messages> 
            <div class="noExport" *kendoGridDetailTemplate="let dataItem">
              <invoice-details [details]="dataItem.Charges"></invoice-details>
            </div>            
            <ng-template kendoPagerTemplate let-totalPages="totalPages" let-currentPage="currentPage">
               <div class="pager-prev-next"><kendo-pager-prev-buttons></kendo-pager-prev-buttons>
               <kendo-pager-numeric-buttons [buttonCount]="10"></kendo-pager-numeric-buttons>
               <kendo-pager-next-buttons></kendo-pager-next-buttons></div>
               <div class="page-sizes"><kendo-pager-page-sizes [pageSizes]="[5, 10, 25, 50]" title="Invoices"></kendo-pager-page-sizes></div>
               <div class="pager-info"><kendo-pager-info></kendo-pager-info></div>
            </ng-template>

            <kendo-grid-pdf fileName="Invoices.pdf" [allPages]="true" paperSize="Letter" [repeatHeaders]="true" [landscape]="true">
              <kendo-grid-pdf-margin top="2cm" left="1cm" right="1cm" bottom="2cm"></kendo-grid-pdf-margin>
                <kendo-grid-column  field="ContactName" title="Name"></kendo-grid-column>
                <kendo-grid-column field="AttentionName" title="Attn To"></kendo-grid-column>
                <kendo-grid-column field="CustomerReference" title="Cust. Ref."></kendo-grid-column>
                <kendo-grid-column field="InvoiceDate" title="Date" format="{0:d}"></kendo-grid-column>
                <kendo-grid-column field="InvoiceReference" title="Ref. #"></kendo-grid-column>
                <kendo-grid-column field="OrderNumber" title="File No."></kendo-grid-column>
                <kendo-grid-column field="CurrentBalance" title="Amount"></kendo-grid-column>
                <kendo-grid-column field="ReferenceData" title="Ref. Data"></kendo-grid-column>
                <ng-template kendoGridPDFTemplate let-pageNum="pageNum" let-totalPages="totalPages">
                <div class="page-template">
                  <div class="footer">
                    Page {{ pageNum }} of {{ totalPages }}
                  </div>
                </div>
              </ng-template>
            </kendo-grid-pdf>
            <kendo-grid-excel fileName="Invoices.xlsx">
                <kendo-excelexport-column field="ContactName" title="Bill To Company"></kendo-excelexport-column>
                <kendo-excelexport-column field="AttentionName" title="Bill To Attention"></kendo-excelexport-column>
                <kendo-excelexport-column field="CustomerReference" title="Customer Reference"></kendo-excelexport-column>
                <kendo-excelexport-column field="InvoiceDate" title="Invoice Date" format="{0:d}"></kendo-excelexport-column>
                <kendo-excelexport-column field="InvoiceReference" title="Invoice Ref. #"></kendo-excelexport-column>
                <kendo-excelexport-column field="OrderNumber" title="File No."></kendo-excelexport-column>
                <kendo-excelexport-column field="CurrentBalance" title="Invoice Amount"></kendo-excelexport-column>
                <kendo-excelexport-column field="ReferenceData" title="Reference Data"></kendo-excelexport-column>
            </kendo-grid-excel>
        </kendo-grid>
        
       
        </div>
        
        <div class="runningTotal text-right pull-right total_bottom">
            <div>Invoices: {{selCount}}&nbsp;&nbsp;Total Payment: $ {{selTotal}}</div>
        </div>

        </div>
        </div>
        </div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="paymentSummary" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-center" id="paymentSummary">Invoice Summary</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">Lorem</div>
            <div class="modal-footer">
                <div class="left-side">
                    <button type="button" class="btn btn-danger btn-link">Cancel</button><!-- data-dismiss="modal" (click)="toggleTitle()"-->
                </div>
                <div class="divider"></div>
                <div class="right-side">
                    <button type="button" class="btn btn-success btn-link">Pay Selected</button>
                </div>
            </div>
              </div>
          </div>
        </div>

    `
})

export class InvoiceComponent implements AfterViewChecked {

    public pageSize: number = 10;
    public skip: number = 0;
    public sort: SortDescriptor[] = [];
    public gridView: GridDataResult;
    public invoices: any[] = invoices;
    private paying: any[] = [];
    public selCount: number = 0;
    public selTotal: number = 0;

    @ViewChild(GridComponent) grid: GridComponent;

    public state: State = {
        // Initial filter descriptor
        filter: {
            logic: "and",
            filters: []
        }
    };

    public ngAfterViewChecked(): void {
        //this.UpdateTotal();
    }

    constructor() {
        this.sort = [{ field: "ContactName", dir: "asc" }, { field: "InvoiceDate", dir: "desc"}];
        this.invoices = orderBy(this.invoices, this.sort);
        this.loadProducts();
        this.sort = [];

        document.addEventListener("DOMContentLoaded", function(){
            $(".k-grid-header").removeAttr("style");
            $('.k-grid-header-wrap').css("border-width", "0");
            $('tr.k-master-row td').addClass("easyPay_cell");
            $('table.k-grid-table').removeClass("k-grid-table").addClass("table table-hover nowrap dataTable dtr-inline");



            $(":checkbox").on('change', function() {
                var total = [];
                $('.form-check-input:checked').each(function(){  //find the checked checkboxes and loop through them
                    total.push($(".easyPay_cell .easyPay_balance").html()); //add the values to the array

                    //alert(parseInt($(".easyPay_cell .easyPay_balance").html()));
                });        
                $('#field_results').val(total);  //join the array
            });
        });
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

    public PaySelected(): void {
      this.paying = [];
      //For each of the invoices on the screen
      for (let item of this.invoices) {
        //Did the user mark them to pay?
        if (item.ToPay == true) {
          //Add them to the Paying array
          this.paying.push(item);
          //Remove them from the Invoices list so they can't be paid again.
          var idx = this.invoices.indexOf(item);
          this.invoices.splice(idx, 1);
        }
      }

      this.loadProducts();

    } 

    public UpdateTotal(): void {
        this.selCount = 0;
        this.selTotal = 0;

        for (let item of this.invoices) {
            //Is this marked to be paid?
            if (item.ToPay == true) {
                //Add them to the count of pending
                this.selCount += 1;
                //Add their total to the running total
                this.selTotal = Number(this.selTotal) + Number(item.CurrentBalance);
            }
        }
    }
}
