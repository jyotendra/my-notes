import { Injectable } from '@angular/core';
import * as endpoints from '@app/shared/services/api-services/api-endpoints';
import { ApiHandler } from '@app/shared/services/api-services/api-handler.service';

@Injectable()
export class ReportService {
    constructor(private apiHandler: ApiHandler) {
    }

    getDriverList(page: number, query: string) {
        return this.apiHandler.apiGet(endpoints.driverListURL() + '?limit=10&offset=' + (page - 1) * 10 + '&q=' + query);
    }
}
