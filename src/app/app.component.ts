import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UploadRoadmapComponent } from './upload-roadmap/upload-roadmap.component';
import { RoadmapService } from './services/roadmap.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    UploadRoadmapComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  roadmapService = inject(RoadmapService);

  /* reactive state */
  hasRoadmap = computed(() => {

    const roadmap = this.roadmapService.roadmap();

    return roadmap && roadmap.length > 0;

  });

  ngOnInit(){

    this.roadmapService.loadRoadmap();

  }

}