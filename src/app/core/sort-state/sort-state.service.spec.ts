import { TestBed } from '@angular/core/testing';
import { SortStateService } from './sort-state.service';

describe('SortStateService', () => {
  let service: SortStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortStateService);
  });

  it('should return the initial state', () => {
    const initialState = service.getState();
    expect(initialState).toEqual({
      sortKey: undefined,
      isAscending: true,
      currentPage: 1,
    });
  });

  it('should update the state partially', () => {
    const newState = { sortKey: 'name', isAscending: false };

    service.setState(newState);

    const updatedState = service.getState();
    expect(updatedState).toEqual({
      sortKey: 'name',
      isAscending: false,
      currentPage: 1,
    });
  });

  it('should update the state incrementally', () => {
    service.setState({ sortKey: 'name' });
    service.setState({ currentPage: 2 });

    const updatedState = service.getState();
    expect(updatedState).toEqual({
      sortKey: 'name',
      isAscending: true,
      currentPage: 2,
    });
  });
});
