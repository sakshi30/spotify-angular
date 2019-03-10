import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavPlayerComponent } from './fav-player.component';

describe('FavPlayerComponent', () => {
  let component: FavPlayerComponent;
  let fixture: ComponentFixture<FavPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
