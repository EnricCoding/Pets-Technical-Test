import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReusableTableComponent } from './reusable-table.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ReusableTableComponent', () => {
  let component: ReusableTableComponent;
  let fixture: ComponentFixture<ReusableTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReusableTableComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReusableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort event when clicking on a sortable column header', () => {
    const sortSpy = spyOn(component.sort, 'emit');
    const sortableColumnKey = 'name';
    component.allowedSortKeys = ['name', 'age'];
    
    component.onSort(sortableColumnKey);

    expect(sortSpy).toHaveBeenCalledWith(sortableColumnKey);
  });

  it('should emit rowClick event when a row is clicked', () => {
    const rowClickSpy = spyOn(component.rowClick, 'emit');
    const mockRow = { id: 1, name: 'Dog', kind: 'dog' };
    
    component.onRowClick(mockRow);

    expect(rowClickSpy).toHaveBeenCalledWith(mockRow.id);
  });

  it('should replace image source with defaultImage on error', () => {
    const mockEvent = {
      target: { src: '' } as HTMLImageElement,
    } as unknown as Event;
    
    component.defaultImage = 'assets/images/default-pet-image.webp';
    component.handleImageError(mockEvent);

    expect((mockEvent.target as HTMLImageElement).src).toBe('assets/images/default-pet-image.webp');
  });
});
