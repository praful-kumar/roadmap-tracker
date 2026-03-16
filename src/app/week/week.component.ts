import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Week } from '../models';
import { DayComponent } from '../day/day.component';

@Component({
  standalone: true,
  selector: 'app-week',
  imports: [CommonModule, DayComponent],
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  @Input() week!: Week;

  @Input() expanded = false;

  @Output() toggle = new EventEmitter<void>();

  activeDay: string | null = null;

  /** flag to detect sidebar navigation */
  private fromSidebar = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {

    this.route.fragment.subscribe(fragment => {

      if (!fragment) return;

      const parts = fragment.split('-');
      const weekPart = parts[0];
      const dayPart = parts[1];

      if (weekPart === this.week.week) {

        this.fromSidebar = true;

        this.activeDay = dayPart;

        if (!this.expanded) {
          this.toggle.emit(); // open week
        }

      }

    });

  }

  toggleDay(day: string) {
    /** if navigation came from sidebar, do not collapse */
    if (this.fromSidebar) {
      this.activeDay = day;
      this.fromSidebar = false;
      return;
    }

    if (this.activeDay === day) {
      this.activeDay = null;   // collapse only on manual click
    } else {
      this.activeDay = day;
    }

  }

}