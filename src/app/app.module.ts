import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomSelectComponent } from './custom-select/custom-select/custom-select.component';
import { CustomSelectOptionComponent } from './custom-select/custom-select-option/custom-select-option.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomToasterComponent } from './toaster/custom-toaster/custom-toaster.component';
import { ToastService } from './toaster/custom-toaster/toast.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomSelectComponent,
    CustomSelectOptionComponent,
    CustomToasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PortalModule,
    A11yModule,
    ReactiveFormsModule 
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})  
export class AppModule { }
