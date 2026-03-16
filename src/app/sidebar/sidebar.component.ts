import { Component, signal, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RoadmapService } from '../services/roadmap.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  roadmap = this.roadmapService.roadmap;

  expandedWeek = signal<string | null>(null);

  mobileOpen = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roadmapService: RoadmapService
  ) {}

  ngOnInit() {

    /* Expand correct week from fragment */
    this.route.fragment.subscribe(fragment => {

      if (!fragment) return;

      const parts = fragment.split('-');
      const weekPart = parts[0];

      this.expandedWeek.set(weekPart);

    });


    /* Close sidebar automatically after navigation (mobile only) */
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {

        if (window.innerWidth < 900) {
          this.mobileOpen.set(false);
        }

      });

  }


  /* Toggle week accordion */
  toggleWeek(week: string) {

    this.expandedWeek.update(current =>
      current === week ? null : week
    );

  }


  /* Mobile sidebar toggle */
  toggleMobileSidebar() {

    this.mobileOpen.update(v => !v);

  }

  closeMobileSidebar() {

    this.mobileOpen.set(false);

  }


  /* When clicking a day */
  handleDayClick(day: string, week: string) {

    this.expandedWeek.set(week);

    if (window.innerWidth < 900) {
      this.mobileOpen.set(false);
    }

  }


  /* Reset sidebar when switching screen size */
  @HostListener('window:resize')
  onResize() {

    if (window.innerWidth > 900) {
      this.mobileOpen.set(false);
    }

  }

}