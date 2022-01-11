import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumCatagoriesComponent } from './forum-catagories.component';

describe('ForumCatagoriesComponent', () => {
  let component: ForumCatagoriesComponent;
  let fixture: ComponentFixture<ForumCatagoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumCatagoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumCatagoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
