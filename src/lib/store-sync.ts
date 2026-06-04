import { db } from "./db";

type Listener = () => void;

let listeners: Listener[] = [];

export const storeSync = {
  subscribe(listener: Listener) {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  notify() {
    listeners.forEach((l) => l());
  },

  getState() {
    return db.get();
  },

  update(updater: (state: any) => any) {
    const current = db.get();
    const updated = updater(current);
    db.set(updated);
    this.notify();
  },
};