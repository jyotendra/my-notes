# Case:

Suppose we want to attach a subscription to an event only when certain input is being defined. Like in our case we want to track 'keyup' event only when "isSearchAsTypeOn" is set to true.

In such cases we can declare @Input meta on the setter accessor of the property. More on this [here](https://ngdev.space/angular-2-input-property-changes-detection-3ccbf7e366d2)

Examine the setter 'isSearchAsTypeOn', in the code below. It will be invoked only when someone sets the property isSearchAsTypeOn in component.html.



    import { Component, OnInit, Output, Input, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/add/observable/fromEvent';
    import 'rxjs/add/operator/debounce';
    import 'rxjs/add/observable/interval';


    @Component({
    selector: 'app-manage-search',
    templateUrl: 'search.component.html'
    })
    export class ManageSearchComponent {

    query: string;

    _isSearchAsTypeOn: boolean;

    @Output() onQuery = new EventEmitter();

    @Input() placeholderText= 'Search...';

    @Input()
    set isSearchAsTypeOn(val) {
        this._isSearchAsTypeOn = val;
        if (this._isSearchAsTypeOn) {
        const keyUpEv = Observable.fromEvent(this.searchEl.nativeElement, 'keyup');
        const debouncedKeyupEv = keyUpEv.debounce(() => Observable.interval(700));
        debouncedKeyupEv.subscribe({
            next: () => {
            this.query = this.searchEl.nativeElement.value;
            this.onQuery.emit(this.query);
            }
        });
        }
    }

    @ViewChild('searchInput') searchEl;

    constructor() {
    }


    handleQuerying(event, query: string) {
        if ( !this._isSearchAsTypeOn || event.key === 'Enter') {
        this.query = query;
        this.onQuery.emit(this.query);
        }
    }
    }
