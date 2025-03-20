import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImparaComponent } from './impara.component';

describe('ImparaComponent', () => {
  let component: ImparaComponent;
  let fixture: ComponentFixture<ImparaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImparaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImparaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
