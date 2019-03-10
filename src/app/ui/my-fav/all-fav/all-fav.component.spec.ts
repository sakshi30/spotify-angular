import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFavComponent } from './all-fav.component';

describe('AllFavComponent', () => {
  let component: AllFavComponent;
  let fixture: ComponentFixture<AllFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
