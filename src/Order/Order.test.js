jest.mock("../utils/getDate");

/* eslint-disable import/first */
import React from "react";
import {getDate} from "../utils/getDate";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Order from "./Order.js";
import {fakeOrders} from "../data/fakeOrders";

configure({adapter: new Adapter()});

describe("Order.js", () => {
    beforeAll(() => {
        getDate.mockReturnValue("11 марта, чт, 2021 год");
    });

    afterAll(() => {
        getDate.mockClear();
    });


    test("default render", () => {
        const template = shallow(<Order order={fakeOrders[0]}/>);

        expect(template).toMatchSnapshot();
        //expect(getDate).toHaveBeenCalledWith(fakeOrders[0].date);
    });

    test("default render mock call", () => {
        shallow(<Order order={fakeOrders[0]}/>);
        expect(getDate).toHaveBeenCalledWith(fakeOrders[0].date);
    });

    test("render without props", () => {
        const template = shallow(<Order/>);
        expect(template).toMatchSnapshot();
    });

    test("render with no items", () => {
        const order = {
            date: 1,
            shop: "shop"
        }

        const template = shallow(<Order order={order}/>);
        expect(template).toMatchSnapshot();
    });

    test("null render with empty item", () => {
        const props = {
            order: {
                shop: null,
                date: "",
            }
        };

        const order = new Order(props);
        const result = order.render()
        expect(result).toBeNull();
    });
});
