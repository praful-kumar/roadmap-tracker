import { Component, OnInit } from '@angular/core';
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
    UploadRoadmapComponent   // 🔹 IMPORTANT
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasRoadmap = false;

  constructor(private roadmapService: RoadmapService) {}

  ngOnInit() {

    this.roadmapService.loadRoadmap();

    this.hasRoadmap = !!localStorage.getItem('roadmap-data');

  }
 

}