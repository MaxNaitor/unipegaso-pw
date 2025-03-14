import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercatiComponent } from './mercati.component';

describe('MercatiComponent', () => {
  let component: MercatiComponent;
  let fixture: ComponentFixture<MercatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercatiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
