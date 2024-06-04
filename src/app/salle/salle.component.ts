import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SalleService } from 'src/Services/salle.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Salle } from 'src/Modeles/Salle';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent {
  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6', '7'];
  dataSource = new MatTableDataSource<Salle>([]);

  constructor(private salleService: SalleService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadSalles();
  }

  loadSalles() {
    this.salleService.getAll().subscribe((salles) => {
      this.dataSource.data = salles;
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
        this.salleService.ONDELETE(id).subscribe(() => {
          this.loadSalles();
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}