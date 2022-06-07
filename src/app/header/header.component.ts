import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() featureSelected = new EventEmitter<string>();

  constructor() {}

  collapsed = true;

  ngOnInit() {}

  onSelect(feature: string): void {
    this.featureSelected.emit(feature);
  }
}
