import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastService } from './toaster/custom-toaster/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private toasterService:ToastService
  ){}

  title = 'custom-select';

  selected_state:FormControl = new FormControl(null);

  options = [
    {
      label:"KARNATAKA",
      value:"karnataka"
    },
    {
      label:"ANDRA",
      value:"andra"
    },
    {
      label:"KERALA",
      value:"kerala"
    },
    {
      label:"TAMILNADU",
      value:"tamilnadu"
    }
  ]

  chip_click(value:string){
    this.selected_state.setValue(value);
  }

  disable_control(){
    if(this.selected_state.disabled){
      this.selected_state.enable();
      this.showToaster("Input enabled");
    }else{
      this.selected_state.disable();
      this.showToaster("Input disabled");
    }
  }

  showToaster(message:string){
    this.toasterService.show({
      type: 'neutral',
      text: message
    })
  }

  clear_value(){
    this.selected_state.reset();
  }
  
}
