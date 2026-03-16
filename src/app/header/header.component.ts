import { Component, signal,computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../services/progress.service';
import { RoadmapService } from '../services/roadmap.service';
import { Router } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  progress = inject(ProgressService);
  roadmapService = inject(RoadmapService);
  router = inject(Router);

  config = computed(() => this.roadmapService.config());

  pct = computed(() => this.progress.percentComplete());

  setupNewGoal() {

    const confirmReset = confirm(
      "This will delete your current roadmap and progress.\n\nDo you want to setup a new goal?"
    );

    if (!confirmReset) return;

    /* Clear stored roadmap and progress */
    localStorage.removeItem('roadmap-data');
    localStorage.removeItem('roadmap-completions-v1');

    /* Redirect to upload page */
    this.router.navigate(['/']);

  }

  showConfirm = signal(false);

openConfirm(){
  this.showConfirm.set(true);
}

closeConfirm(){
  this.showConfirm.set(false);
}

confirmReset(){

  this.roadmapService.resetRoadmap();

  this.showConfirm.set(false);

  this.router.navigate(['/upload']);

}

}