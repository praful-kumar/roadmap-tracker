export interface AppConfig {
  title: string;
  goal?: string;
}

export interface TaskItem {
  title: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | string;
  topic?: string;
}

export interface Day {
  day: string;
  concept?: string;
  tasks: TaskItem[];
}

export interface Week {
  week: string;
  focus?: string;
  days: Day[];
}
