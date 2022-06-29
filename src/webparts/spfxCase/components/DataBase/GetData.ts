import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import {
  ISPCarLists,
  ISPEmployeeLists,
  ISPSaleLists,
} from "../ISpfxCaseProps";


export const _getSalesListData = (context): Promise<ISPSaleLists> => {
  return context.spHttpClient
    .get(
      context.pageContext.web.absoluteUrl +
        `/_api/web/lists/getbytitle('Sales')/Items`,
      SPHttpClient.configurations.v1
    )
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
};

export const _getCarsListData = (context): Promise<ISPCarLists> => {
  return context.spHttpClient
    .get(
      context.pageContext.web.absoluteUrl +
        `/_api/web/lists/getbytitle('Carmodels')/Items`,
      SPHttpClient.configurations.v1
    )
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
};

export const _getEmployeesListData = (context): Promise<ISPEmployeeLists> => {
  return context.spHttpClient
    .get(
      context.pageContext.web.absoluteUrl +
        `/_api/web/lists/getbytitle('Employees')/Items`,
      SPHttpClient.configurations.v1
    )
    .then((response: SPHttpClientResponse) => {
      return response.json();
    });
};