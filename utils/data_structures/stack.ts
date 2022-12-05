export class Stack<T> {
  private array: T[] = [];

  pop(): T | undefined {
    return this.array.pop();
  }

  push(data: T): void {
    this.array.push(data);
  }

  // Returns the first element in the queue
  peek(): T {
    if (this.isEmpty()) throw new Error("The stack is empty!");

    return this.array[this.array.length - 1];
  }

  isEmpty(): boolean {
    return this.array.length === 0;
  }
}