import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoadmapService {

  roadmap = signal<any[]>([]);
  config = signal<any>(null);

  loadRoadmap() {

    const data = localStorage.getItem('roadmap-data');

    if (!data) return;

    const parsed = JSON.parse(data);

    this.roadmap.set(parsed.roadmap || []);
    this.config.set(parsed.config || null);

  }

}