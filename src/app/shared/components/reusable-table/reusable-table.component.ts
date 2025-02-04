import { Component, Input, Output, EventEmitter, TrackByFunction, ChangeDetectionStrategy } from '@angular/core';
import { Column } from '../../../models/column/column.model';
import { DEFAULTIMAGE } from '../../../utils';

@Component({
  selector: 'app-reusable-table',
  templateUrl: './reusable-table.component.html',
  standalone: false,
  styleUrls: ['./reusable-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReusableTableComponent {

  @Input() data: any[] = []; 
  @Input() columns: Column[] = [];
  @Input() sortKey: string | undefined = undefined;
  @Input() isAscending: boolean = true; 
  @Input() allowedSortKeys: string[] = []; 
  @Input() defaultImage: string = DEFAULTIMAGE; 
  @Input() trackByFn: TrackByFunction<any> = this.trackByItemId;
  @Output() sort: EventEmitter<string> = new EventEmitter<string>(); 
  @Output() rowClick: EventEmitter<number> = new EventEmitter<number>(); 

  onSort(columnKey: string): void {
    if (!this.allowedSortKeys.includes(columnKey)) {
      return;
    }
    this.sort.emit(columnKey);
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row.id);
  }

  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.defaultImage;
  }

  trackByItemId(_: number, item: any): any {
    return item.id; 
  }

}
