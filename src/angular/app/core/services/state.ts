import { computed, Signal, signal, WritableSignal } from '@angular/core';

export abstract class State<T> {
  readonly #state: WritableSignal<T>;

  protected constructor(initialState: T) {
    this.#state = signal(initialState);
  }

  protected get state(): Signal<T> {
    return this.#state.asReadonly();
  }

  protected set<K extends keyof T>(key: K, value: T[K]): void {
    this.#state.update((currentValue) => ({ ...currentValue, [key]: value }));
  }

  protected setState(partialState: Partial<T>): void {
    this.#state.update((currentState) => ({
      ...currentState,
      ...partialState,
    }));
  }

  protected select<K extends keyof T>(key: K): Signal<T[K]> {
    return computed(() => this.#state()[key]);
  }
}
