const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

export function generateIdByPrefix(prefix: string): string {
  return `${prefix.toLowerCase()}-${uuidv5(prefix, uuidv4())}`;
}
