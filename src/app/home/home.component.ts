import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Salle } from 'src/Modeles/Salle';
import { SalleService } from 'src/Services/salle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent { 
  dataSource: Salle[] = [];

  constructor(private salleService: SalleService) {}

  ngOnInit() {
    this.loadSalles();
  }

  loadSalles() {
    this.salleService.getAll().subscribe((salles) => {
      this.dataSource = salles;
    });
  }
}
