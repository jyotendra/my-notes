import { ToasterService } from './../../../shared/services/toaster.service';
import { TimeoutError } from 'rxjs/util/TimeoutError';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Lightbox } from 'angular2-lightbox';
import { ManageDetailsBase } from '@app/admin/manage/details-base.component';

import { CUSTOMER_DETAIL_URL, NO_USER_IMAGE } from '@app/shared/services/api-services/api-endpoints';

@Component({
  selector: 'app-manage-customer-detail',
  templateUrl: './manage-customer-detail.component.html',
  styles: [`.state-active {
    color: green;
  }
  .state-pending {
    color: orange;
  }

  .state-inactive {
    color: red;
  }
`]
})
export class ManageCustomersDetailComponent extends ManageDetailsBase {

  noImageURL;

  constructor(apiCaller: CustomerService, activateRoute: ActivatedRoute,
    toasterService: ToasterService, lightbox: Lightbox) {
      super(CUSTOMER_DETAIL_URL, apiCaller, lightbox, activateRoute, toasterService);
      this.noImageURL = NO_USER_IMAGE;
  }


  paintStatus() {
    let colorClass;
    if (this.userModel.status) {
      switch (this.userModel.status) {
        case 'active':
          colorClass = 'state-active';
          break;

        case 'inactive':
          colorClass = 'state-inactive';
          break;

        case 'pending':
          colorClass = 'state-pending';
          break;

        default:
          break;
      }
      return colorClass;
    }
  }

}
