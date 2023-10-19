import { HomeAdminComponent } from './home-admin.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('HomeComponent', () => {
  let component: HomeAdminComponent;
  let fixture: ComponentFixture<HomeAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminComponent]
    });
    fixture = TestBed.createComponent(HomeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
