import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesListComponent } from './entries-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EntryService } from 'src/app/services/entry.service';
import { FormsModule } from '@angular/forms';

describe('EntriesListComponent', () => {
  let component: EntriesListComponent;
  let fixture: ComponentFixture<EntriesListComponent>;
  let service: EntryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      providers: [EntryService],
      declarations: [EntriesListComponent]
    });
    fixture = TestBed.createComponent(EntriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(EntryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('refreshListForEntriesList', () => {
    it('should call retrieveEntries', () => {
      spyOn(component, 'retrieveEntries');
      component.refreshList();
      expect(component.retrieveEntries).toHaveBeenCalled();
    });
  });
});
