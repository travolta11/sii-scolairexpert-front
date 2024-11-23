import { Component, NgModule, OnInit } from '@angular/core';
import { AddRoomComponent } from './add-room/add-room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { Room } from '../../models/room/room.module';
import { RoomService } from '../../services/room/room-service.service';
import { MaterielService } from '../../services/materiel/materiel.service';
import { Materiel } from '../../models/materiel.model';
import { CommonModule, NgClass } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ssi-sx-room',
  standalone: true,
  imports: [AddRoomComponent, UpdateRoomComponent, CommonModule, NgxPaginationModule, FormsModule,  ],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  rooms: Room[] = [];
  materiel: Materiel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  searchTerm: string = '';
  showAlert: boolean = false;
  filtredRooms: Room[] = [];
  selectedRoom: Room | undefined;
  totalPages: number = 0;
  paginatedRooms: Room[] = [];


  constructor(
    private roomService: RoomService,
    private materielService: MaterielService
  ) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getAllRooms().subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.rooms.forEach(room => this.loadMaterielCodes(room));
      this.filtredRooms = [...this.rooms]; 
      this.totalPages = Math.ceil(this.rooms.length / this.itemsPerPage);
        this.updatePaginatedRooms();
    });
  }

  updatePaginatedRooms() {
    const filtredRooms = this.rooms.filter(room =>
      room.materielCodes?.join(', ').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      String(room.capacity).toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      room.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedRooms= filtredRooms.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedRooms();
  }
  
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRooms();
    }
  }
  
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRooms();
    }
  }
  
  goToFirstPage() {
    this.currentPage = 1;
    this.updatePaginatedRooms();
  }
  
  goToLastPage() {
    this.currentPage = this.totalPages;
    this.updatePaginatedRooms();
  }
  

  loadMaterielCodes(room: Room): void {
    if (room.materielIds && room.materielIds.length > 0) {
      const materielCodePromises = room.materielIds.map(id =>
        this.materielService.getMaterielById(id).toPromise()
      );
  
      Promise.all(materielCodePromises).then(materiels => {
        room.materielCodes = materiels.map(materiel => materiel!.code);
      });
    } else {
      room.materielCodes = []; 
    }
  }
  

  async filterRooms(): Promise<void> {
    if (this.searchTerm) {
      const filteredRooms: Room[] = [];
      for (const room of this.rooms) {
        const matches = await this.materielMatches(room.materielIds);
        if (
          room.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          room.capacity.toString().includes(this.searchTerm.toLowerCase()) ||
          matches
        ) {
          filteredRooms.push(room);
        }
      }
      this.filtredRooms = filteredRooms;
    } else {
      this.filtredRooms = [...this.rooms];
    }
  }

  materielMatches(materielIds: number[]): Promise<boolean> {
    const promises = materielIds.map(id =>
      this.materielService.getMaterielById(id).toPromise()
    );

    return Promise.all(promises).then(materiels => {
      return materiels.some(materiel =>
        materiel!.code?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }
  onEditRoom(room: Room): void {
    this.selectedRoom = room;
  }

  onRoomUpdated(): void {
    this.loadRooms();
  }
  
  onRoomAdded(room: Room) {
    this.loadRooms();  
  }

  openUpdateModal(room: Room): void {
    const modalElement = document.getElementById('updateModal') as any;
    const updateRoomComponent = modalElement.querySelector('ssi-sx-update-room');
    updateRoomComponent.setRoomData(room);
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
  }
  

  onDeleteRoom(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(id).subscribe(() => {
        this.loadRooms();
        this.showAlert = true;
        setTimeout(() => this.showAlert = false, 3000);
      });
    }
  }
}
