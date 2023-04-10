import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceCardComponent} from "./resource-card.component";



@NgModule({
  declarations: [ResourceCardComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ResourceCardComponent
  ]
})
export class ResourceCardModule { }
