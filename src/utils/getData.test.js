import {getDate} from "./getDate";

describe("test getData()", () => {
    test("NaN value", () => {
        const res = getDate(null);
        expect(res).toBeUndefined();
    });

    test("one day from 01.01.1970", () => {
        const day = 24 * 3600 * 1000
        const res = getDate(day)
        expect(res).toEqual("2 января, пт, 1970 год")
    });
})