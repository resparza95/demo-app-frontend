import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsListComponent } from './logs-list.component';
import { LogService } from 'src/app/services/log.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogsListComponent', () => {
  let component: LogsListComponent;
  let fixture: ComponentFixture<LogsListComponent>;
  let service: LogService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LogService],
      declarations: [LogsListComponent]
    });
    fixture = TestBed.createComponent(LogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(LogService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('refreshListForLogsList', () => {
    it('should call retrieveList', () => {
      spyOn(component, 'retrieveList');
      component.refreshList();
      expect(component.retrieveList).toHaveBeenCalled();
    });
  });
});
