import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistPlaylistComponent } from './artist-playlist.component';

describe('ArtistPlaylistComponent', () => {
  let component: ArtistPlaylistComponent;
  let fixture: ComponentFixture<ArtistPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
