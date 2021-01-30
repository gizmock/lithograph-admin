export class PromiseAllWithMax<T> {
  private readonly max: number;
  private readonly promise: (t: T) => Promise<void>;

  constructor(promise: (t: T) => Promise<void>, max: number) {
    this.max = max;
    this.promise = promise;
  }

  async do(ts: T[]) {
    for (let i = 0; i < ts.length; i += this.max) {
      const end = i - 1 > ts.length ? ts.length - 1 : i + this.max;
      await Promise.all(ts.slice(i, end).map((t) => this.promise(t)));
    }
  }
}
