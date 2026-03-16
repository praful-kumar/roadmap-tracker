import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Day } from '../models';
import { TaskComponent } from '../task/task.component';

@Component({
  standalone: true,
  selector: 'app-day',
  imports: [CommonModule, TaskComponent],
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {

  @Input() day!: Day;
  @Input() week = '';

  @Input() expanded = false;

  @Output() toggle = new EventEmitter<void>();

 onToggle(event: MouseEvent) {
  event.stopPropagation();
  this.toggle.emit();
}

}