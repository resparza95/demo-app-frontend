import { TestBed } from '@angular/core/testing';
import { LogService } from './log.service';
import { Log } from '../models/log.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LogService', () => {
  let service: LogService;
  let httpTestingController: HttpTestingController;
  const baseUrl = 'http://localhost:8080/api/usage';
  const apiUrl = `${baseUrl}/list`;

  const mockItems: Log[] = [
    { id: 1, appliedFilter: '> than 5 words', appliedOrder: "Ordered by commentCount column DESC", createdAt: "2025-05-02T15:42:04.000Z", updatedAt: "2025-05-02T15:42:04.000Z" },
    { id: 2, appliedFilter: '<= than 5 words', appliedOrder: "Ordered by points column DESC", createdAt: "2025-05-02T15:42:04.000Z", updatedAt: "2025-05-02T15:42:04.000Z" },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogService],
    });
    service = TestBed.inject(LogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all logs', () => {
    service.getAll().subscribe(items => {
      expect(items).toEqual(mockItems);
    });

    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockItems); 
  });
});
