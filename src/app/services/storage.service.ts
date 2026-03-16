import { Injectable } from '@angular/core';

const LS_KEY = 'roadmap-completions-v1';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private map: Record<string, boolean> = {};

  constructor() {
    this.load();
  }

  private load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      this.map = raw ? JSON.parse(raw) : {};
    } catch (e) {
      this.map = {};
    }
  }

  private save() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(this.map));
    } catch (e) {
      console.error('Failed to save completions', e);
    }
  }

  isCompleted(key: string): boolean {
    return !!this.map[key];
  }

  setCompleted(key: string, value: boolean) {
    if (value) this.map[key] = true;
    else delete this.map[key];
    this.save();
  }

  getAll(): Record<string, boolean> {
    return { ...this.map };
  }
}
