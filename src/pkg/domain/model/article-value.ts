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

export class ArticleOpenTime {
  readonly value: Date;

  constructor(value: Date) {
    this.value = value;
  }
}

export class ArticleCreatedTime {
  readonly value: Date;

  constructor(value: Date) {
    this.value = value;
  }
}
