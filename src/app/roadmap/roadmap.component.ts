import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekComponent } from '../week/week.component';

@Component({
  standalone: true,
  selector: 'app-roadmap',
  imports: [CommonModule, WeekComponent],
  templateUrl: './roadmap.component.html',
})
export class RoadmapComponent implements OnInit {

  roadmap: any[] = [];

  activeWeek: string | null = null;

  ngOnInit() {

    const data = localStorage.getItem('roadmap-data');

    if (data) {
      const parsed = JSON.parse(data);
      this.roadmap = parsed.roadmap || [];
    }

  }

  toggleWeek(week: string) {
    this.activeWeek = this.activeWeek === week ? null : week;
  }

}