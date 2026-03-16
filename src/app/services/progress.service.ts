// import { Injectable, computed, signal, Signal } from '@angular/core';
// import { ROADMAP } from '../config/roadmap.config';
// import { StorageService } from './storage.service';

// @Injectable({ providedIn: 'root' })
// export class ProgressService {
//   private completions = signal<Record<string, boolean>>({});

//   constructor(private storage: StorageService) {
//     this.completions.set(this.storage.getAll());
//   }

//   refresh() {
//     this.completions.set(this.storage.getAll());
//   }

//   toggle(key: string, value: boolean) {
//     this.storage.setCompleted(key, value);
//     this.completions.set(this.storage.getAll());
//   }

//   isCompleted(key: string) {
//     return !!this.completions()[key];
//   }

//   totalTasks = computed(() => {
//     let total = 0;
//     for (const w of ROADMAP) {
//       for (const d of w.days) total += d.tasks.length;
//     }
//     return total;
//   });

//   completedTasks = computed(() => {
//     const map = this.completions();
//     return Object.keys(map).length;
//   });

//   remainingTasks = computed(() => this.totalTasks() - this.completedTasks());

//   percentComplete = computed(() => {
//     const t = this.totalTasks();
//     return t === 0 ? 0 : Math.round((this.completedTasks() / t) * 100);
//   });

//   weeklyProgress() {
//     return ROADMAP.map(w => {
//       const total = w.days.reduce((s, d) => s + d.tasks.length, 0);
//       let done = 0;
//       for (const d of w.days) {
//         for (const t of d.tasks) {
//           const key = this.keyFor(w.week, d.day, t.title);
//           if (this.completions()[key]) done++;
//         }
//       }
//       return { week: w.week, total, done, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
//     });
//   }

//   topicProgress() {
//     const topics: Record<string, { total: number; done: number }> = {};
//     for (const w of ROADMAP) {
//       for (const d of w.days) {
//         for (const t of d.tasks) {
//           const name = t.topic || 'Other';
//           topics[name] = topics[name] || { total: 0, done: 0 };
//           topics[name].total++;
//           const key = this.keyFor(w.week, d.day, t.title);
//           if (this.completions()[key]) topics[name].done++;
//         }
//       }
//     }
//     return Object.entries(topics).map(([topic, v]) => ({ topic, ...v, percent: v.total === 0 ? 0 : Math.round((v.done / v.total) * 100) }));
//   }

//   keyFor(week: string, day: string, taskTitle: string) {
//     return `${week}::${day}::${taskTitle}`;
//   }
// }
import { Injectable, computed, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { RoadmapService } from './roadmap.service';

@Injectable({ providedIn: 'root' })
export class ProgressService {

  private completions = signal<Record<string, boolean>>({});

  constructor(
    private storage: StorageService,
    private roadmapService: RoadmapService
  ) {
    this.completions.set(this.storage.getAll());
  }

  refresh() {
    this.completions.set(this.storage.getAll());
  }

  toggle(key: string, value: boolean) {
    this.storage.setCompleted(key, value);
    this.completions.set(this.storage.getAll());
  }

  isCompleted(key: string) {
    return !!this.completions()[key];
  }

  /** Total Tasks */
  totalTasks = computed(() => {

    const roadmap = this.roadmapService.roadmap();

    let total = 0;

    for (const w of roadmap) {
      for (const d of w.days) {
        total += d.tasks.length;
      }
    }

    return total;

  });

  /** Completed Tasks */
  completedTasks = computed(() => {
    const map = this.completions();
    return Object.keys(map).length;
  });

  /** Remaining Tasks */
  remainingTasks = computed(() =>
    this.totalTasks() - this.completedTasks()
  );

  /** Percentage Complete */
  percentComplete = computed(() => {

    const total = this.totalTasks();

    return total === 0
      ? 0
      : Math.round((this.completedTasks() / total) * 100);

  });

  /** Weekly Progress */
  weeklyProgress() {

    const roadmap = this.roadmapService.roadmap();

    return roadmap.map(w => {

      const total = w.days.reduce((s: number, d: any) => s + d.tasks.length, 0);

      let done = 0;

      for (const d of w.days) {
        for (const t of d.tasks) {

          const key = this.keyFor(w.week, d.day, t.title);

          if (this.completions()[key]) done++;

        }
      }

      return {
        week: w.week,
        total,
        done,
        percent: total === 0 ? 0 : Math.round((done / total) * 100)
      };

    });

  }

  /** Topic Progress */
  topicProgress() {

    const roadmap = this.roadmapService.roadmap();

    const topics: Record<string, { total: number; done: number }> = {};

    for (const w of roadmap) {
      for (const d of w.days) {
        for (const t of d.tasks) {

          const topic = t.topic || 'Other';

          topics[topic] = topics[topic] || { total: 0, done: 0 };

          topics[topic].total++;

          const key = this.keyFor(w.week, d.day, t.title);

          if (this.completions()[key]) topics[topic].done++;

        }
      }
    }

    return Object.entries(topics).map(([topic, v]) => ({
      topic,
      ...v,
      percent: v.total === 0 ? 0 : Math.round((v.done / v.total) * 100)
    }));

  }

  /** Unique key for tasks */
  keyFor(week: string, day: string, taskTitle: string) {
    return `${week}::${day}::${taskTitle}`;
  }

}