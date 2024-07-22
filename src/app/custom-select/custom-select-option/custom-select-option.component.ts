import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CustomSelectComponent } from '../custom-select/custom-select.component';
import { CustomSelectService } from '../custom-select.service';

@Component({
  selector: 'custom-select-option',
  templateUrl: './custom-select-option.component.html',
  styleUrl: './custom-select-option.component.scss'
})
export class CustomSelectOptionComponent {

  @Input()
  public value!: any;
  
  private select: CustomSelectComponent;

  @ViewChild('option')
  private option!: ElementRef;

  constructor(private dropdownService: CustomSelectService) {
    this.select = this.dropdownService.getSelect();
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent): void {
    event.preventDefault();
    this.select.selectOption(this);
  }

  public getOptionElement(): any {
    return this.option.nativeElement;
  }

}
