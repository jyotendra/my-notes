import { ToasterService } from '@app/shared/services/toaster.service';
import { TimeoutError } from 'rxjs/util/TimeoutError';
import { Router } from '@angular/router';
import { RideService } from './../service/ride.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { } from '@types/googlemaps';
import { ManageListBase } from '@app/admin/manage/list-base.component';
import { RIDE_LIST_URL } from '@app/shared/services/api-services/api-endpoints';

const possibleStates = [
  {
    status: '',
    label: 'all'
  },
  {
    status: 'completed',
    label: 'completed'
  },

  {
    status: 'started',
    label: 'running'
  },

  {
    status: 'requested',
    label: 'requested'
  },

  {
    status: 'pre-accepted',
    label: 'Pre-Booked'
  },

  {
    status: ['driver_cancelled', 'customer_cancelled'],
    label: 'cancelled'
  },

  {
    status: 'timeout',
    label: 'timeout'
  }
];

@Component({
  selector: 'app-manage-rides-list',
  templateUrl: './manage-rides-list.component.html',
})
export class ManageRidesListComponent extends ManageListBase {

  possibleOptions = possibleStates;

  constructor(private rideService: RideService, private router: Router, toasterService: ToasterService) {
    super('', rideService, toasterService);
   }

  isCancelled(status) {
    if (status === 'customer cancelled' || status === 'driver cancelled') {
      return true;
    } else {
      return false;
    }
  }

    //  Own method passed to parent
  getRideList(page, query) {
    super.getList(page, query, this.modifyData);
  }

  modifyData(rows: Array<any>): Array<any> {
    rows.forEach((ride) => {
      ride.className = this.rideService.getStatusClass(ride.status);
      ride.status = this.rideService.alignStatus(ride.status);
    });
    return rows;
  }

  getRide(id: number) {
    this.router.navigate(['/rides/detail', id]);
  }

}
