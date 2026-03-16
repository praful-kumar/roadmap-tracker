import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItem } from '../models';
import { ProgressService } from '../services/progress.service';
import { inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: TaskItem;
  @Input() week = '';
  @Input() day = '';
  progress = inject(ProgressService);

  get key() {
    return this.progress.keyFor(this.week, this.day, this.task.title);
  }

  get completed() {
    return this.progress.isCompleted(this.key);
  }

  toggle(ev: Event) {
    const checked = (ev.target as HTMLInputElement).checked;
    this.progress.toggle(this.key, checked);
  }
}
