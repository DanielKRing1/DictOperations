import DictUtils from '../src/Operations';

describe('DictUtils', () => {
    it('Should update the target object with the source properties', () => {
        const target = {
            a: 1,
            b: 'hello 1',
            c: {
                i: 2,
                ii: 3,
                iii: 'hello 2',
            },
            d: {
                i: 4,
            }
        };

        const src = {
            a: 5,
            b: 'hello 3',
            c: {
                i: 6,
                ii: 7,
                iii: 'hello 4',
            },
            d: {
                i: 8,
            }
        };

        DictUtils.updateRecursive(target, src);

        expect(target).toEqual(src);
    });

    it('Should copy the full source to the target object', () => {
        const target = {
            a: 1,
            b: 'hello 1',
            c: {
                i: 2,
                ii: 3,
                iii: 'hello 2',
            },
            d: {
                i: 4,
            }
        };

        const src = {
            a: 5,
            b: 'hello 3',
            c: {
                i: 6,
                ii: 7,
                iii: 'hello 4',
            },
            d: {
                i: 8,
            }
        };

        const copy = DictUtils.copyRecursive(target, src);
        expect(copy).toEqual(src);
    });
});