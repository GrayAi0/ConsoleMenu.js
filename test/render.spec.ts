import { centerString } from '../src/helpers/rendering';

test('Center string', () => {

    expect(centerString('test', 10)) .toBe('   test   ');
    expect(centerString('test2', 10)).toBe('   test2  ');

});
