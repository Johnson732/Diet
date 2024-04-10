import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumedComponent } from './consumed.component';

describe('ConsumedComponent', () => {
  let component: ConsumedComponent;
  let fixture: ComponentFixture<ConsumedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumedComponent]
    });
    fixture = TestBed.createComponent(ConsumedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
