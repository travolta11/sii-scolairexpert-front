import { Component } from '@angular/core';
import { AddRoomComponent } from './add-room/add-room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';

@Component({
  selector: 'ssi-sx-room',
  standalone: true,
  imports: [AddRoomComponent,UpdateRoomComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {

}
