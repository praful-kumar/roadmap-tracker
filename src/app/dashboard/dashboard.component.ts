import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../services/progress.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  progress = inject(ProgressService);
  total = computed(() => this.progress.totalTasks());
  done = computed(() => this.progress.completedTasks());
  remaining = computed(() => this.progress.remainingTasks());
  percent = computed(() => this.progress.percentComplete());
  weekly = this.progress.weeklyProgress();
  topics = this.progress.topicProgress();
}
