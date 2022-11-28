export class Queue<T> {
  private array: T[] = [];

  add(data: T): void {
    this.array.push(data);
  }

  remove(): T | undefined {
    if (this.isEmpty()) throw new Error("The queue is empty!");

    return this.array.shift();
  }

  // Returns the first element in the queue
  peek(): T {
    if (this.isEmpty()) throw new Error("The queue is empty!");

    return this.array[0];
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }
}