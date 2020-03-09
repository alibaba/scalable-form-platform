export default class List<T> {
  public page: number;
  public pageSize: number;
  public total: number;
  public list: T[];

  constructor(page: number, pageSize: number, total: number, list: T[]) {
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
    this.list = list;
  }
}
