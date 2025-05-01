import { Component, OnInit } from '@angular/core';
import { Entry } from 'src/app/models/entry.model';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-entries-list',
  templateUrl: './entries-list.component.html',
  styleUrls: ['./entries-list.component.css'],
})
export class EntriesListComponent implements OnInit {
  entries?: Entry[];
  currentEntry: Entry = {};
  currentIndex = -1;
  targetUrl = 'https://news.ycombinator.com';

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.retrieveEntries();
  }

  retrieveEntries(): void {
    this.entryService.getAll().subscribe({
      next: (data) => {
        this.entries = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveEntries();
    this.currentEntry = {};
    this.currentIndex = -1;
  }

  setActiveEntry(tutorial: Entry, index: number): void {
    this.currentEntry = tutorial;
    this.currentIndex = index;
  }

  removeAllEntries(): void {
    this.entryService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  crawl(): void {
    this.currentEntry = {};
    this.currentIndex = -1;

    this.entryService.crawlEntries().subscribe({
      next: () => {
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }
}
