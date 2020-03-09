import {isEmpty, isId, isUrl, isEmail, isMoney} from "./utils";

describe('Validate Test', () => {
    it('isEmpty', () => {
        expect(isEmpty('', 'string')).toBe(true);
    });
    it('isEmpty', () => {
        expect(isEmpty([], 'array')).toBe(true);
    });
    it('isEmpty', () => {
        expect(isEmpty({}, 'object')).toBe(true);
    });
    it('isId', () => {
        expect(isId('880881198999999999')).toBe(true);
    });
    it('isUrl', () => {
        expect(isUrl('https://www.taobao.com')).toBe(true);
    });
    it('isEmail', () => {
        expect(isEmail('abc@taobao.com')).toBe(true);
    });
    it('isMoney', () => {
        expect(isMoney('123.54')).toBe(true);
    });
});
