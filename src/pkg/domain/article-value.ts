export class ArticleID {
  value: string;

  constructor(value: string) {
    this.value = value;
  }
}

export class ArticleTitle {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}

export class ArticleBody {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
}

export class ArticlePublished {
  readonly value: Date;

  constructor(value: Date) {
    this.value = value;
  }
}
