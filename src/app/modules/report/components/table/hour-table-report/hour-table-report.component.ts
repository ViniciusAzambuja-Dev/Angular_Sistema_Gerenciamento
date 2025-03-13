import { Component, Input } from '@angular/core';

import { HourResponse } from '../../../../../models/interfaces/hour/HourResponse';

@Component({
  selector: 'app-hour-table-report',
  templateUrl: './hour-table-report.component.html',
  styleUrl: './hour-table-report.component.scss'
})
export class HourTableReportComponent {
  @Input() hours: Array<HourResponse> = [];
}
