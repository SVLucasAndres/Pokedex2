import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BluePage } from './blue.page';

describe('BluePage', () => {
  let component: BluePage;
  let fixture: ComponentFixture<BluePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BluePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
