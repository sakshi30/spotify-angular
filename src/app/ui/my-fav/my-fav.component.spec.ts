import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavComponent } from './my-fav.component';

describe('MyFavComponent', () => {
  let component: MyFavComponent;
  let fixture: ComponentFixture<MyFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
