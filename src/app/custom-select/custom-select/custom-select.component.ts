import { CdkPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { CustomSelectService } from '../custom-select.service';
import { CustomSelectOptionComponent } from '../custom-select-option/custom-select-option.component';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.scss',
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
    CustomSelectService
  ]
})
export class CustomSelectComponent {

  constructor(
    private overlay: Overlay,
    private selectService:CustomSelectService
  ){
    this.selectService.register(this);
  }

  @Input() public label: string = '';
  @Input() public placeholder: string = '';

  @Input() disabled:boolean = false;

  @ViewChild('select') public select!: ElementRef<HTMLElement>;
  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;

  @ContentChildren(CustomSelectOptionComponent)
  public options!: QueryList<CustomSelectOptionComponent>;

  private overlayRef!: OverlayRef;

  private selectedOption!: CustomSelectOptionComponent;

  writeValue(value: any): void {
   if(value){
    this.selectedValue = value;
    this.setOption();
   }else{
    this.selectedValue = null;
    this.selectedDisp = null;
   }
    // Set the value of your custom control element
  }
  
  registerOnChange(fn: any): void {
    // Register the callback for value changes
    this.onChange = fn
  }
  
  registerOnTouched(fn: any): void {
    // Register the callback for touch events
    this.onTouch = fn
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    // Disable or enable your custom 
  }

  onChange = (value:any)=>{
    console.log(value);
  } 

  onTouch:any = (touched:any) => {
    console.log(touched);
  }

  selectedDisp:any = null;
  selectedValue:any = null;

  setOption(){
    this.options.forEach((option:CustomSelectOptionComponent) =>{
      if(option.value === this.selectedValue){
        this.selectedOption = option;
        this.selectedDisp = this.selectedOption.getOptionElement().innerHTML;
      }
    })
  }

  public selectOption(option: CustomSelectOptionComponent) {
    this.hide();
    if (this.selectedOption !== option) {
      this.selectedOption = option;
      this.onChange(this.selectedOption.value);
      this.selectedDisp = this.selectedOption.getOptionElement().innerHTML;
    }
  }


  showDropdown(){
    if(!this.disabled){
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
      this.overlayRef.attach(this.contentTemplate);
      this.overlayRef.backdropClick().subscribe(() => {
        this.hide()
      });
      this.overlayRef.outsidePointerEvents().subscribe(()=>{
        this.hide();
      })
    }
  }

  private hide(): void {
    this.overlayRef.dispose();
  }

  private getOverlayConfig(): OverlayConfig {

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.select.nativeElement)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      width:this.select.nativeElement.clientWidth,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }

}
