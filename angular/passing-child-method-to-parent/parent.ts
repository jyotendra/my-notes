import { OnInit } from '@angular/core';
import { ServiceBase } from '@app/admin/manage/services-base.component';
import { Lightbox } from 'angular2-lightbox';
import { ToasterService } from '@app/shared/services/toaster.service';
import { TimeoutError } from 'rxjs/util/TimeoutError';

export class ManageListBase implements OnInit {

    hydrationUrl: string;

    dataList: Array<any>;

    dataListCount: number;

    page: number;

    loading: boolean;

    query: any;

    totalQueryableData: number;

    constructor(private url: string, protected serviceBase: ServiceBase, protected toasterService: ToasterService) {
            this.hydrationUrl = url;
            this.page = 1;
            this.query = '';
            this.loading = false;
            this.dataList = [];
            this.dataListCount = 0;
            this.totalQueryableData = 0;
        }

    ngOnInit() {
        this.getList(this.page);
    }

    getList(page: number, query?: string|Array<string>, modifierFn?: (data: any) => any) {
        this.loading = true;
        if (query) {
            this.query = query;
        }
        if (this.query instanceof Array) {
            this.query = this.query.join();
        }
        this.serviceBase.getList(this.hydrationUrl, this.page, this.query)
        .subscribe({
            next: ((result: any) => {
                const fetchedData = this.modifyGetData(result.data.rows, modifierFn);
                this.dataList = this.dataList.concat(fetchedData);
                this.totalQueryableData = result.data.total;
                this.dataListCount = this.dataList.length;
                this.page = page;
                this.loading = false;
            }),

            error: (err => {
                if (err instanceof TimeoutError) {
                    this.toasterService.Error('', 'Timeout Error');
                }
                this.loading = false;
            }),

        });
    }

    modifyGetData(dataToModify, fn: (data: any) => any) {
        if (fn) {
            return fn(dataToModify);
        } else {
            return dataToModify;
        }
    }

    setStatus(status: string) {
        let state;
        switch (status) {
          case 'active':
            state = true;
            break;

          case 'inactive':
            state = false;
            break;

          default:
            state = false;
            break;
        }
        return state;
      }

    updateStatus(url: string, id: number, status: string) {
        // Find index of object to be changed
        const indexToBeChanged = this.dataList.findIndex((entity) => entity.id === id);
        if (this.dataList[indexToBeChanged].status !== status) {
          this.serviceBase.updateStatus(url, id, status)
          .subscribe((result: any) => {
            if (result.success === true) {
              this.toasterService.Success(result.message);
              // change the object in array itself
              this.dataList[indexToBeChanged].status = status;
              // assign a new copy - to force change detection
              this.dataList = this.dataList.concat();
            } else {
              this.toasterService.Error();
            }
          },
          (err) => {
            if (err instanceof TimeoutError) {
              this.toasterService.Error('', 'Timeout Error');
            }
          });
        }
    }

    onScroll() {
        if (this.page >= 2 && !this.loading && (this.dataList.length < this.totalQueryableData)) {
          this.getList(this.page + 1);
        }
    }

    firstScroll() {
        if (this.page === 1 && !this.loading) {
          this.getList(this.page + 1);
        }
    }

    search() {
        this.dataList = [];
        this.getList(1);
    }

}
