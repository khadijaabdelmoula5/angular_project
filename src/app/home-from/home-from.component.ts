import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/Modeles/Client';
import { Salle } from 'src/Modeles/Salle';
import { Reservation } from 'src/Modeles/reservation';
import { ClientService } from 'src/Services/client.service';
import { ReservationService } from 'src/Services/reservation.service';
import { SalleService } from 'src/Services/salle.service';

@Component({
  selector: 'app-home-from',
  templateUrl: './home-from.component.html',
  styleUrls: ['./home-from.component.css']
})
export class HomeFromComponent {
  reservation: Reservation | null = null;
  form!: FormGroup;
  clients: Client[] = [];
  salles: any[] = [];

  constructor(
    private reservationService: ReservationService,
    private salleService: SalleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadSalles();
    this.activatedRoute.paramMap.subscribe(params => {
      const salleId = params.get('salleId');
      
      if (salleId ) {
        this.form.patchValue({ salleId });
      }
    });
  }

  onsub(): void {
    if (this.form.valid) {
      const reservationToSave = this.form.value;
      this.reservationService.ONSAVE(reservationToSave).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  initForm(): void {
    this.form = new FormGroup({
      dateDebut: new FormControl(null, [Validators.required]),
      dateFin: new FormControl(null, [Validators.required]),
      clientId: new FormControl(null, [Validators.required]),
      salleId: new FormControl(null, [Validators.required])
    });
  }
  loadSalles(): void {
    this.salleService.getAll().subscribe((salles: Salle[]) => {
      this.salles = salles;
    });
  }

  getSalleName(): string {
    const salleIdControl = this.form.get('salleId');
    if (salleIdControl) {
      const salleId = salleIdControl.value;
      const salle = this.salles.find(s => s.id === salleId);
      return salle ? salle.name : '';
    }
    return '';
  }
  
}
