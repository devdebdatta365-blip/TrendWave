import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminViewProductComponent } from './adminviewproduct.component';

// import { AdminviewproductComponent } from './adminviewproduct.component';

describe('AdminviewproductComponent', () => {
  let component: AdminViewProductComponent;
  let fixture: ComponentFixture<AdminViewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
