import {sortByDate, sortByItemCount, sortOrders} from "./sortOrders";
import {fakeOrders} from "../data/fakeOrders";

describe("sortByItemCount empty", () => {
    const cases = [
        [{items: undefined}, {items: undefined}, 0],
        [undefined, undefined, 0],
        [null, null, 0],
    ];
    test.each(cases)("(%o, %o , %i)",
        (a, b, expected) => {
            const result = sortByItemCount(a, b);
            expect(result).toBe(expected);
        });
});

describe("sortByItemCount filled", () => {
    const cases = [
        [{items: ["first", "second"]}, {items: ["1", "2"]}, 0],
        [{items: ["first", "second", "third"]}, {items: ["1", "2"]}, 1],
        [{items: ["first", "second"]}, {items: ["1", "2", "3"]}, -1],
    ];

    test.each(cases)("(%o, %o , %i)",
        (a, b, expected) => {
            const result = sortByItemCount(a, b);
            expect(result).toBe(expected);
        });
});

describe("sortByDate empty", () => {
    const cases = [
        [{date: undefined}, {date: undefined}, 0],
        [undefined, undefined, 0],
        [null, null, 0],
    ];

    test.each(cases)("(%o, %o , %i)",
        (a, b, expected) => {
            const result = sortByDate(a, b);
            expect(result).toBe(expected);
        });

});

describe("sortByDate filled", () => {
    const cases = [
        [{date: ["0"]}, {date: ["0"]}, 0],
        [{date: ["0"]}, {date: ["1"]}, 1],
        [{date: ["1"]}, {date: ["0"]}, -1],
    ];

    test.each(cases)("(%o, %o , %i)",
        (a, b, expected) => {
            const result = sortByDate(a, b);
            expect(result).toBe(expected);
        });
});

describe("sortOrders", () => {

    test("wrong order", () => {
        const mockSortFunc = jest.fn();
        sortOrders(undefined, mockSortFunc);
        expect(mockSortFunc).not.toHaveBeenCalled()
    });

    test("wrong comparator", () => {
        const mockSortFunc = jest.fn();
        sortOrders(fakeOrders, undefined);
        expect(mockSortFunc).not.toHaveBeenCalled()
    });

    // test("correct answer", () => {
    //     const raiseComparator = (a, b) => a > b;
    //     const ordersId = [2, 3, 1, 4]
    //     sortOrders(ordersId, raiseComparator)
    //     console.log(ordersId)
    //     expect(ordersId).toEqual([1, 2, 3, 4])
    // });

    test("correct answer", () => {
        const day = 24 * 3600 * 1000;
        const orders = [
            {
                id: 1,
                date: 3 * day,
            },
            {
                id: 2,
                date: day,
            },
            {
                id: 3,
                date: 2 * day,
            }
        ];
        const raiseComparator = (a, b) => a.date > b.date;
        sortOrders(orders, raiseComparator)
        expect(orders).toEqual(
            [
                {
                    id: 2,
                    date: day,
                },
                {
                    id: 3,
                    date: 2 * day,
                },
                {
                    id: 1,
                    date: 3 * day,
                }
            ]
        );
    });
});
