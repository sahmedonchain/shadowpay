type Listener = (msg: {
  type: "success" | "error" | "info";
  message: string;
}) => void;

let listeners: Listener[] = [];

export const feedback = {
  // 🔥 NEW: typed feedback
  success(message: string) {
    this.emit({ type: "success", message });
  },

  error(message: string) {
    this.emit({ type: "error", message });
  },

  info(message: string) {
    this.emit({ type: "info", message });
  },

  // 🔥 OLD COMPATIBILITY (keep working)
  show(message: string) {
    this.emit({ type: "info", message });
  },

  // 🔥 CORE EMITTER
  emit(payload: { type: "success" | "error" | "info"; message: string }) {
    if (typeof window !== "undefined") {
      listeners.forEach((fn) => fn(payload));
    }
  },

  // 🔥 subscribe UI layer (toast system later)
  subscribe(fn: Listener) {
    listeners.push(fn);

    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  },
};