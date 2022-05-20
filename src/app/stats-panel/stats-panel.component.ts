import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css'],
})
export class StatsPanelComponent implements OnInit {
  @Input() accessToken!: string;
  constructor() {}

  ngOnInit(): void {}
}
