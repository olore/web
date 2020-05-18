/* Pi-hole: A black hole for Internet advertisements
 * (c) 2019 Pi-hole, LLC (https://pi-hole.net)
 * Network-wide ad blocking via your own hardware.
 *
 * Web Interface
 * DomainInput component test
 *
 * This file is copyright under the latest version of the EUPL.
 * Please see LICENSE file for your rights under this license. */

import React from "react";
import { mount } from "enzyme";
import QueryLog from "../QueryLog";
import fetchMock from "fetch-mock";
import api from "../../../util/api";

React.useLayoutEffect = React.useEffect;

const tick = global.tick;

let historyResponse: ApiHistoryResponse = {
  cursor: null,
  history: [
    {
      timestamp: 1584434653,
      type: 1,
      domain: "pi-hole.net",
      client: "10.0.0.100",
      status: 1,
      dnssec: 1,
      reply: 2,
      response_time: 21
    }
  ]
};

it("contains a table and pagination component", () => {
  fetchMock.mock(/.*/, { cursor: null, history: [] });
  const wrapper = renderQueryLog();

  expect(wrapper.find("QueryTable")).toExist();
  expect(wrapper.find("QueryPagination")).toExist();
});

describe("shows correct color for first 4 columns based on status value", () => {
  it.each`
    status | expectedColor
    ${0}   | ${""}
    ${1}   | ${"red"}
    ${2}   | ${"green"}
    ${3}   | ${"green"}
    ${4}   | ${"red"}
    ${5}   | ${"red"}
    ${6}   | ${"red"}
  `(
    `should show columns of status $status with color: $expectedColor`,
    async ({ status, expectedColor }) => {
      expect.assertions(5);
      historyResponse.history[0].status = status;

      jest.spyOn(api, "getHistory").mockImplementation(() => {
        return Promise.resolve(historyResponse) as Promise<ApiHistoryResponse>;
      });

      const wrapper = renderQueryLog();
      await tick();
      wrapper.update();

      let cells = wrapper.find("tr td div");
      expect(cells.length).toBeGreaterThan(4);

      for (let i = 0; i < 4; i++) {
        let node = cells.get(i);
        expect(node.props.style).toHaveProperty("color", expectedColor);
      }
    }
  );
});

const renderQueryLog = (props: Partial<any> = {}): any => {
  return mount(<QueryLog {...props} />);
};
