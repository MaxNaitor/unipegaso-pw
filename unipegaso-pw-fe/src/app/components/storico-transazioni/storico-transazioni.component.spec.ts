import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoTransazioniComponent } from './storico-transazioni.component';

describe('StoricoTransazioniComponent', () => {
  let component: StoricoTransazioniComponent;
  let fixture: ComponentFixture<StoricoTransazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoricoTransazioniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoricoTransazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
