import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../shared/interfaces/home/home.interfaces";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit{

  @Input() user!: User

  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>()

  ngOnInit(): void {
  }

  deleteUser() {
    this.onDelete.emit(this.user.id)
  }
}
