import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';


@Component({
    selector: 'invoice-details',
    template: `
      <kendo-grid [data]="details" [pageSize]="25" [skip]="skip" [pageable]="true" [scrollable]="'none'" (pageChange)="pageChange($event)">
        <kendo-grid-column field="TransactionDescription" title="Description of Transaction" width="480"></kendo-grid-column>
        <kendo-grid-column field="ChargeAmount" title="Charge" format="{0:c}"></kendo-grid-column>
        <ng-template kendoPagerTemplate></ng-template>
      </kendo-grid>
  `
})

export class CategoryDetailComponent implements OnInit {

    /**
     * The category for which details are displayed
     */
    @Input() public details: Object;

    public view: Observable<GridDataResult>;
    public skip: number = 0;

    constructor() {
    }

    public ngOnInit(): void {

    }

    public pageChange({ skip, take }: PageChangeEvent): void {
        this.skip = skip;

    }
}
