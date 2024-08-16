class EventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    const listenersForEvent = this.listeners.get(event);
    if (!listenersForEvent.includes(callback)) {
      listenersForEvent.push(callback);
    }
  }

  removeEventListener(event, callback) {
    if (this.listeners.has(event)) {
      const listenersForEvent = this.listeners.get(event);
      const index = listenersForEvent.indexOf(callback);
      if (index !== -1) {
        listenersForEvent.splice(index, 1);
      }
      if (listenersForEvent.length === 0) {
        this.listeners.delete(event);
      }
    }
  }

  dispatchEvent(event) {
    if (this.listeners.has(event)) {
      const listenersForEvent = this.listeners.get(event);
      for (const listener of listenersForEvent) {
        listener();
      }
    }
  }
}

// Sample Usage
const target = new EventTarget();

const logHello = () => console.log('hello');
const logWorld = () => console.log('world');

target.addEventListener('hello', logHello);
target.addEventListener('world', logWorld);

target.dispatchEvent('hello'); // Console logs: hello
target.dispatchEvent('world'); // Console logs: world

target.removeEventListener('hello', logHello);

target.dispatchEvent('hello'); // Does nothing
target.dispatchEvent('world'); // Console logs: world
