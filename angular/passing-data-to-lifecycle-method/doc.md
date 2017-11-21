#This is onInit of parent

    ngOnInit(dataModifier?: (dataToModify: any) => any) {
        this.route.paramMap
        .switchMap((params: ParamMap) => {
            this.userId = params.get('id');
            this.loading = true;
            return this.serviceBase.getDetails(this.hydrationUrl, this.userId);
        }).subscribe({
            next: (result: any) => {
                const newData = dataModifier ? dataModifier(result.data) : result.data;
                this.userModel = Object.assign({}, newData);
                this.loading = false;
            },

            error: (err) => {
                this.toasterService.Error('while fetching data', 'Error');
                this.loading = false;
            },

        });
        }


# This is the OnInit of child method

    ngOnInit() {
        super.ngOnInit('sds');
    }

