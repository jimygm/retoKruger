import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatosComponent } from './create-datos.component';

describe('CreateDatosComponent', () => {
  let component: CreateDatosComponent;
  let fixture: ComponentFixture<CreateDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
