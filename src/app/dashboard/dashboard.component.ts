import { Component, OnInit } from '@angular/core';
import { SalleService } from 'src/Services/salle.service';
import { ClientService } from 'src/Services/client.service';
import { ReservationService } from 'src/Services/reservation.service';
import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nb_Salles: number = 0;
  nb_clients: number = 0;
  nb_reservation: number = 0;
  salleCounts: { [key: string]: number } = {};

  chartDatapie: ChartDataset[] = [
    {
      label: 'Salles',
      data: []
    }
  ];
  chartLabelspie: string[] = [];

  chartDatabar: ChartDataset[] = [
    {
      label: 'Salles',
      data: [],
      backgroundColor: []
    }
  ];
  chartLabelsbar: string[] = [];

  chartData: ChartDataset[] = [
    {
      label: 'Clients',
      data: []
    }
  ];
  chartLabels: string[] = [];

  chartDataLine: ChartDataset[] = [
    {
      label: 'Reservations',
      data: [],
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1
    }
  ];
  chartLabelsLine: string[] = [];

  constructor(
    private MS: SalleService,
    private ES: ClientService,
    private RS: ReservationService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.MS.getAll().subscribe((salles) => {
      this.nb_Salles = salles.length;

      // Initialiser les compteurs de salles
      salles.forEach((salle) => {
        this.salleCounts[salle.name] = 0;
      });

      // Compter le nombre de salles par description
      salles.forEach((salle) => {
        this.salleCounts[salle.name]++;
      });

      // Mettre à jour les données du graphique pie
      this.chartLabelspie = Object.keys(this.salleCounts);
      this.chartDatapie[0].data = Object.values(this.salleCounts);

      // Mettre à jour les données du graphique bar
      this.chartLabelsbar = this.chartLabelspie;
      this.chartDatabar[0].data = this.chartDatapie[0].data;
      this.chartDatabar[0].backgroundColor = this.generateRandomColors(this.chartLabelsbar.length);
    });

    // Récupérer les clients
    this.ES.GET().subscribe((clients) => {
      this.nb_clients = clients.length;

      // Compter le nombre de clients par nom
      const clientCounts: { [key: string]: number } = {};
      clients.forEach((client) => {
        if (clientCounts[client.name]) {
          clientCounts[client.name]++;
        } else {
          clientCounts[client.name] = 1;
        }
      });

      // Mettre à jour les données du graphique client
      this.chartLabels = Object.keys(clientCounts);
      this.chartData[0].data = Object.values(clientCounts);
    });

    // Récupérer les réservations
    this.RS.getAll().subscribe((reservations) => {
      this.nb_reservation = reservations.length;

     
      const reservationCounts: { [key: string]: number } = {};
      reservations.forEach((reservation) => {
        const clientId = reservation.clientId;
        if (reservationCounts[clientId]) {
          reservationCounts[clientId]++;
        } else {
          reservationCounts[clientId] = 1;
        }
      });

     
      this.chartLabelsLine = Object.keys(reservationCounts);
      this.chartDataLine[0].data = Object.values(reservationCounts);
    });
  }


  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(this.getRandomColor());
    }
    return colors;
  }

  // Générer une couleur aléatoire
  getRandomColor(): string {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`;
  }
}
