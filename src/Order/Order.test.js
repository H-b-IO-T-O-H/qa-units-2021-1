import React from "react";
import {getDate} from "../utils/getDate";
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import Adapter from "enzyme-adapter-react-16";
import Order from "./Order.js";
import {fakeOrders} from "../data/fakeOrders";

configure({adapter: new Adapter()});
jest.mock("../utils/getDate");

describe("Order.js", () => {
    beforeAll(() => {
        getDate.mockReturnValue("11 марта, чт, 2021 год");
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    test("default render", () => {
        const template = shallow(<Order order={fakeOrders[0]}/>);

        expect(toJson(template)).toMatchSnapshot();
        expect(getDate).toHaveBeenCalledWith(fakeOrders[0].date);
    });

    test("render without props", () => {
        const template = shallow(<Order/>);

        expect(toJson(template)).toMatchSnapshot();
    });

    test("render with no items", () => {
        const order = {
            date: 1,
            shop: "shop"
        }

        const template = shallow(<Order order={order}/>);

        expect(toJson(template)).toMatchSnapshot();
    });

    test("render with empty item", () => {
        const order = {
            date: 1,
            shop: ''
        };

        const template = shallow(<Order order={order}/>);
        expect(toJson(template)).toMatchSnapshot();
    });
});
