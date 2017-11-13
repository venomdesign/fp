import { ViewEncapsulation, Component, AfterContentInit, ViewChild, ElementRef } from '@angular/core';
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
        <div class="page-header" style="background: #fff;">    
                
                <div class="row" style="width: 84%">
                <div class="progress">
                    <div class="progress-bar progress-bar-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                    <div class="col-lg-12 col-sm-8 mr-auto ml-auto">
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
                   <button kendoGridPDFCommand class="btn btn-outline-danger pull-right"><i class='fa fa-file-pdf-o'></i>&nbsp;Export to PDF</button>
                    <button kendoGridExcelCommand class="btn btn-outline-success pull-right"><i class='fa fa-file-excel-o'></i>&nbsp;Export to Excel</button>
                    <button class="btn btn-primary testMove" (click)='PaySelected();' data-toggle="modal" data-target="#myModal">View Selected</button>
                </div>
            </ng-template>
            <kendo-grid-column field="ToPay" title="Pay" width="50" [filterable]="false">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="checkbox" [(ngModel)]="dataItem.ToPay" [checked]="dataItem.ToPay" class="form-check-input">
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
            <kendo-grid-column field="CurrentBalance" title="Amount" filter="numeric" format="{0:c}"></kendo-grid-column>
            
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
                <kendo-grid-column  field="ContactName" title="Name" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="AttentionName" title="Attn To" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="CustomerReference" title="Cust. Ref." [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="InvoiceDate" title="Date" format="{0:d}" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="InvoiceReference" title="Ref. #" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="OrderNumber" title="File No." [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="CurrentBalance" title="Amount" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
                <kendo-grid-column field="ReferenceData" title="Ref. Data" [headerStyle]="{'font-size': '.6em'}" [style]="{'font-size': '.6em'}"></kendo-grid-column>
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
        
        <div class="progress">
                    <div class="progress-bar progress-bar-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
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
                    <button type="button" class="btn btn-danger btn-link" data-dismiss="modal" (click)="toggleTitle()">Cancel</button>
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

export class InvoiceComponent {

    public pageSize: number = 10;
    public skip: number = 0;
    public sort: SortDescriptor[] = [];
    public gridView: GridDataResult;
    public invoices: any[] = invoices;
    private paying: any[] = [];
    elementRef: ElementRef;
    
    @ViewChild(GridComponent) grid: GridComponent;

    toggleTitle(){
        $('.k-grid-header').attr('style','padding: 0');
    }

    public state: State = {
        // Initial filter descriptor
        filter: {
            logic: "and",
            filters: []
        }
    };

    constructor(elementRef: ElementRef) {
        this.sort = [{ field: "ContactName", dir: "asc" }, { field: "InvoiceDate", dir: "desc"}];
        this.invoices = orderBy(this.invoices, this.sort);
        this.loadProducts();
        this.sort = [];
        this.elementRef = elementRef;
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

      console.log("Here's what's in Invoices after paying everyone");
      console.log(this.invoices);

      this.loadProducts();

      console.log("Paying these");
      console.log(this.paying);
      console.log("These are unpaid");
      console.log(this.invoices);
      alert('Consider them paid!');
    } 


    ngAfterContentInit() {
    $(".k-grid-header").removeAttr("style");
    }
}
