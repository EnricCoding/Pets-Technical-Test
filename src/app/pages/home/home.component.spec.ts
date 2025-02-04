import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { PetOfTheDayComponent } from './components/pet-of-the-day/pet-of-the-day.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { provideHttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        PetOfTheDayComponent, 
        PetListComponent,     
      ],
      imports: [
        TranslateModule.forRoot(),
        MatProgressSpinnerModule, 
      ],
      providers: [
        provideHttpClient(), 
        TranslateService, 
        TranslateStore,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
