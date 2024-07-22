import { Overlay } from '@angular/cdk/overlay';
import { Inject, Injectable, Injector } from '@angular/core';
import { ToastRef } from './toast.ref';
import { ToastConfig, ToastData } from './toast.config';
import { ComponentPortal } from '@angular/cdk/portal';
import { CustomToasterComponent } from './custom-toaster.component';

@Injectable()
export class ToastService {

  private toastref!:ToastRef;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
  ) { }

  defaultToastConfig: ToastConfig = {
    position: {
      top: 60,
      right: 20,
    }
  };

  show(data:ToastData){
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy ,panelClass:'toast-pannel'});
    const toastRef = new ToastRef(overlayRef);
    this.toastref = toastRef;
    const injector = this.getInjector(data, toastRef);
    const toastPortal = new ComponentPortal(CustomToasterComponent, null, injector);
    overlayRef.attach(toastPortal);
    return toastRef;
  }

  getPositionStrategy() {
    return this.overlay.position()
    .global()
    .top(this.getPosition())
    .right(this.defaultToastConfig.position.right + 'px');
  }

  getPosition(){
    const lastToastIsVisible = this.toastref && this.toastref.isVisible();
    const position = lastToastIsVisible 
      ? this.toastref.getPosition().bottom +20
      : this.defaultToastConfig.position.top;
    return position + 'px';
  }

  getInjector(toastdata: ToastData, toastRef: ToastRef) {
    return Injector.create({
      parent:this.parentInjector,
      providers:[
        {
          provide:ToastData,
          useValue:toastdata
        },{
          provide:ToastRef,
          useValue:toastRef
        }
      ]
    })
  }
}
