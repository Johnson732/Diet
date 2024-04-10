/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Delete2Component } from './delete2.component';

describe('Delete2Component', () => {
  let component: Delete2Component;
  let fixture: ComponentFixture<Delete2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Delete2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Delete2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
