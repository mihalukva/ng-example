import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  stateCtrl = new FormControl();
  @Input() findItems: Array<any> = [];
  @Output() searchText = new EventEmitter<string>();
  constructor(public router: Router) {
    this.stateCtrl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.searchText.emit(value);
    });
  }

  ngOnInit(): void {}
}
