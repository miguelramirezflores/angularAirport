import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoVuelosComponent } from './listado-vuelos.component';

describe('ListadoVuelosComponent', () => {
  let component: ListadoVuelosComponent;
  let fixture: ComponentFixture<ListadoVuelosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoVuelosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
