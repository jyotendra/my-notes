import { Component, OnInit } from '@angular/core';
import { ServiceBase } from '@app/admin/manage/services-base.component';
import { Lightbox } from 'angular2-lightbox';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ToasterService } from '@app/shared/services/toaster.service';
import { NO_USER_IMAGE } from '@app/shared/services/api-services/api-endpoints';

export class ManageDetailsBase implements OnInit {

    userId: string;

    hydrationUrl: string;

    userModel: any;

    loading: boolean;

    constructor(url: string, protected serviceBase: ServiceBase, protected lightbox: Lightbox,
        protected route: ActivatedRoute, protected toasterService: ToasterService) {
            this.hydrationUrl = url;
            this.loading = false;
            this.userModel = {};
        }

    ngOnInit() {
        this.route.paramMap
        .switchMap((params: ParamMap) => {
            this.userId = params.get('id');
            this.loading = true;
            return this.serviceBase.getDetails(this.hydrationUrl, this.userId);
        }).subscribe({
            next: (result: any) => {
                this.userModel = Object.assign({}, result.data);
                this.loading = false;
            },

            error: (err) => {
                this.toasterService.Error('while fetching data', 'Error');
                this.loading = false;
            },

        });
     }

     openLightBox(src) {
        if (!src) {
            src = NO_USER_IMAGE;
        }
        const album = [{
          src: src,
          thumb: src
        }];
        this.lightbox.open(album, 0);
      }
}
