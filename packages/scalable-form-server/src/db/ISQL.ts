interface DB {
  all?: any,
  run?: any,
  query?: any
}

export default interface ISQL {
  getDB(): DB;
}
