import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { unitTestBaseMockStore } from "layoutSystems/common/dropTarget/unitTestUtils";
import { lightTheme } from "selectors/themeSelectors";
import { BrowserRouter as Router } from "react-router-dom";
import { EditorViewMode } from "@appsmith/entities/IDE/constants";
import "@testing-library/jest-dom/extend-expect";
import QueryDebuggerTabs from "./QueryDebuggerTabs";
import { ENTITY_TYPE } from "@appsmith/entities/AppsmithConsole/utils";

const mockStore = configureStore([]);

const storeState = {
  ...unitTestBaseMockStore,
  evaluations: {
    tree: {},
  },
  entities: {
    plugins: {
      list: [],
    },
    datasources: {
      structure: {},
    },
  },
  ui: {
    ...unitTestBaseMockStore.ui,
    users: {
      featureFlag: {
        data: {},
        overriddenFlags: {},
      },
    },
    ide: {
      view: EditorViewMode.FullScreen,
    },
    debugger: {
      context: {
        errorCount: 0,
      },
    },
    queryPane: {
      debugger: {
        open: true,
        responseTabHeight: 200,
        selectedTab: "response",
      },
    },
  },
};

describe("ApiResponseView", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(storeState);
  });

  it("the container should have class select-text to enable the selection of text for user", () => {
    const { container } = render(
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <Router>
            <QueryDebuggerTabs
              actionName="Query1"
              actionSource={{
                id: "ID1",
                name: "Query1",
                type: ENTITY_TYPE.ACTION,
              }}
              isRunning={false}
              onRunClick={() => {}}
            />
          </Router>
        </ThemeProvider>
      </Provider>,
    );

    expect(
      container
        .querySelector(".t--query-bottom-pane-container")
        ?.classList.contains("select-text"),
    ).toBe(true);
  });
});
