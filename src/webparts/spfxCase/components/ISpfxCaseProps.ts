import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpfxCaseProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  employees: ISPEmployeeList[];
  cars: ISPCarList[];
  sales: ISPSaleList[];
}

export interface ISPEmployeeLists {
  value: ISPEmployeeList[];
}

export interface ISPEmployeeList {
  Title: number;
  name: string;
}

export interface ISPCarLists {
  value: ISPCarList[];
}

export interface ISPCarList {
  Title: number;
  brand: string;
  model: string;
  price: number;
}

export interface ISPSaleLists {
  value: ISPSaleList[];
  
}

export interface ISPSaleList {
  Title: number;
  carmodel_id: number;
  employee_id: number;
}