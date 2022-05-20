import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css'],
})
export class StatsPanelComponent implements OnInit {
  @ViewChild('matTabGroup', { static: true })
  matTabGroup!: MatTabGroup;

  onMatTabChanged() {
    this.setMatTabGroup();
  }

  setMatTabGroup() {
    let ntvEl = this.matTabGroup._elementRef.nativeElement;
    ntvEl.style.minHeight = ntvEl.clientHeight + 'px';
  }
  constructor() {}

  ngOnInit(): void {
    this.setMatTabGroup();
  }
}
