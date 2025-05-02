import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { Filter } from 'src/app/models/filtermodel';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css'],
})
export class EntriesListComponent implements OnInit {
  entries?: Entry[];
  selectedFilter:string | null = null;
  targetUrl = 'https://news.ycombinator.com';

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.retrieveEntries();
  }

  retrieveEntries(): void {
    this.entryService.getAll().subscribe({
      next: (data) => {
        this.entries = data;
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveEntries();
  }

  removeAllEntries(): void {
    this.entryService.deleteAll().subscribe({
      next: () => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  crawl(): void {
    this.entryService.crawlEntries().subscribe({
      next: () => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  onFilterChange(): void {
    let parameters:Filter = {};

    if(this.selectedFilter == "1") {
      parameters.comparator = '>'; parameters.orderField = 'commentCount';
      this.applyFilter(parameters);
    } else if (this.selectedFilter == "2") {
      parameters.comparator = '<='; parameters.orderField = 'points';
      this.applyFilter(parameters);
    } else {
      this.refreshList();
    }

  }

  applyFilter(parameters: any): void {
    this.entryService.filterEntries(parameters).subscribe({
      next: (data) => {
        this.entries = data;
      },
      error: (e) => console.error(e)
    });
  }
}
