import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestMusicComponent } from './latest-music.component';

describe('LatestMusicComponent', () => {
  let component: LatestMusicComponent;
  let fixture: ComponentFixture<LatestMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
