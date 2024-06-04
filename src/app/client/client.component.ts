import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/Services/client.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Client } from 'src/Modeles/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6'];
  dataSource = new MatTableDataSource<Client>([]);

  constructor(private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.GET().subscribe((clients) => {
      this.dataSource.data = clients;
    });
  }

  delete(id: string): void {
    // 1. lancer la boîte de dialogue de confirmation
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    // 2. attendre le résultat de l'utilisateur
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.ONDELETE(id).subscribe(() => {
          this.loadClients();
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
