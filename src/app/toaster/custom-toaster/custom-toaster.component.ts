import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ToastData } from './toast.config';
import { ToastRef } from './toast.ref';

@Component({
  selector: 'app-custom-toaster',
  templateUrl: './custom-toaster.component.html',
  styleUrl: './custom-toaster.component.scss'
})
export class CustomToasterComponent implements OnInit, AfterViewInit{

  private intervalId: any;
  private progressInterval:any;
  private timePeriod:any = 2000;
  private width:number = 90;
  toastClass!:string
  @ViewChild('element', { static: false }) progressBar!: ElementRef;

  constructor(
    public data: ToastData,
    private ref: ToastRef,
  ){}

  @HostListener('mouseover') onMouseOver() {
    this.stopInterval()
  }
 
  @HostListener('mouseleave') onMouseLeave() {
    this.countdown() 
  }
 
  ngOnInit(): void {
    this.toastClass = this.data.type
  }
 
  ngAfterViewInit(): void {
    this.countdown();
  }

  countdown(){
    this.progressInterval = setInterval(()=>{
      this.progressBar.nativeElement.style.width =
      this.width + '%';
      this.width = this.width-15;
      if(this.timePeriod){
        this.timePeriod = this.timePeriod-200;
      }else{
        this.close()
      }
    },200)
  }

  stopInterval(){
    clearTimeout(this.intervalId);
    clearInterval(this.progressInterval);
  }
  
  ngOnDestroy() {
    clearTimeout(this.intervalId);
    clearInterval(this.progressInterval);
  }

  close() {
    this.ref.close();
  }

}
