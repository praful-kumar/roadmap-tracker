import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../services/progress.service';
import { RoadmapService } from '../services/roadmap.service';

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

  config = computed(() => this.roadmapService.config());

  pct = computed(() => this.progress.percentComplete());

}