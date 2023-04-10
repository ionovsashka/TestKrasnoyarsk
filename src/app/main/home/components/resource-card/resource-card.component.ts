import {Component, Input, OnInit} from '@angular/core';
import {ResourceData} from "../../../../shared/interfaces/resource-page/resource-page.interfaces";

@Component({
  selector: 'app-resource-card',
  templateUrl: './resource-card.component.html',
  styleUrls: ['./resource-card.component.scss']
})
export class ResourceCardComponent implements OnInit{

  @Input() resource!: ResourceData

  ngOnInit(): void {
  }

}
