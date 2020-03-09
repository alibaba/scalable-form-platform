export default class DailyReport {
  public id: number;
  public schemaId: number;
  public createTime: Date;
  public lastModified: Date;

  public dailyDataCount: number;
  public dailyVisitCount: number;
  public dailyVisitUserCount: number;
  public currentTotalDataCount: number;
  public currentTotalVisitCount: number;
  public currentTotalVisitUserCount: number;

  constructor() {
    this.id = 0;
    this.schemaId = 0;
    this.createTime = new Date();
    this.lastModified = new Date();
    this.dailyDataCount = 0;
    this.dailyVisitCount = 0;
    this.dailyVisitUserCount = 0;
    this.currentTotalDataCount = 0;
    this.currentTotalVisitCount = 0;
    this.currentTotalVisitUserCount = 0;
  }
}
