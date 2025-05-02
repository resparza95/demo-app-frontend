import { TestBed } from '@angular/core/testing';
import { EntryService } from './entry.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Entry } from '../models/entry.model';

describe('EntryService', () => {
  let service: EntryService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:8080/api/entries';

  const mockItems: Entry[] = [
      { id: 1, position: 1, title: 'Entry A', points: 5, commentCount: 1, createdAt: "2025-05-02T15:42:04.000Z", updatedAt: "2025-05-02T15:42:04.000Z" },
      { id: 2, position: 2, title: 'Entry B', points: 8, commentCount: 3, createdAt: "2025-05-02T15:42:04.000Z", updatedAt: "2025-05-02T15:42:04.000Z" },
      { id: 3, position: 3, title: 'Entry C', points: 2, commentCount: 0, createdAt: "2025-05-02T15:42:04.000Z", updatedAt: "2025-05-02T15:42:04.000Z" },
  ];

  const mockFilteredItems: Entry[] = [
    { id: 1, position: 1, title: 'Entry A with more than 5 words', points: 5, commentCount: 10, createdAt: "2025-05-02T15:42:04.000Z", updatedAt: "2025-05-02T15:42:04.000Z" },
    { id: 2, position: 2, title: 'Entry B with more than 5 words', points: 8, commentCount: 3, createdAt: "2025-05-02T15:42:04.000Z", updatedAt: "2025-05-02T15:42:04.000Z" },
    { id: 3, position: 3, title: 'Entry C with more than 5 words', points: 2, commentCount: 1, createdAt: "2025-05-02T15:42:04.000Z", updatedAt: "2025-05-02T15:42:04.000Z" },
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EntryService],
    });
    service = TestBed.inject(EntryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all crawled entries', () => {
    service.getAll().subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/list`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockItems); 
  });

  it('should remove all entries', () => {
    service.deleteAll().subscribe(res => {
      expect(res.message).toEqual('Entries deleted successfully.');
    });

    const req = httpTestingController.expectOne(`${baseUrl}/delete`);
    expect(req.request.method).toEqual('DELETE');
  });

  it('should crawl entries', () => {
    service.crawlEntries().subscribe(res => {
      expect(res.message).toEqual('Entries stored successfully.');
      expect(res.itemCount).toEqual(30);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/crawl`);
    expect(req.request.method).toEqual('GET');
  });

  it('should retrieve filtered entries', () => {
    const mockFilters = {  comparator: ">", orderField: "commentCount"};
    service.filterEntries(mockFilters).subscribe(items => {
      expect(items).toEqual(mockFilteredItems);
    });

    const req = httpTestingController.expectOne(`${baseUrl}/listFiltered`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockFilters);
    req.flush(mockFilteredItems); 
  });
});
