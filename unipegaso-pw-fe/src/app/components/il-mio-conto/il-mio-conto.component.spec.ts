import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlMioContoComponent } from './il-mio-conto.component';

describe('IlMioContoComponent', () => {
  let component: IlMioContoComponent;
  let fixture: ComponentFixture<IlMioContoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlMioContoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlMioContoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
