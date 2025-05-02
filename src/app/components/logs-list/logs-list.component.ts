import { Component } from '@angular/core';
import { Log } from 'src/app/models/log.model';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.css'],
})
export class LogsListComponent {
  items?: Log[];

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    this.retrieveList();
  }

  retrieveList(): void {
    this.logService.getAll().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveList();
  }

}
