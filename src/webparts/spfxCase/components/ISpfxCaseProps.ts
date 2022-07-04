import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as React from "react";



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
  siteUrl: string;
  employeeId: number;
  employeeName: string;
  isVisible: boolean;
  employeeIdTitle: "";
  setEmployeeName: React.Dispatch<React.SetStateAction<string>>;
}

export interface ISPEmployeeLists {
  value: ISPEmployeeList[];
  context: WebPartContext;
}

export interface ISPEmployeeList {
  Title: string;
  Id: number;
  odata: [];
  ID: number;
  name: string;
}

export interface ISPCarLists {
  value: ISPCarList[];
  context: WebPartContext;
}

export interface ISPCarList {
  Title: string;
  brand: string;
  model: string;
  price: number;
}

export interface ISPSaleLists {
  value: ISPSaleList[];
  context: WebPartContext;
}

export interface ISPSaleList {
  Title: number;
  carmodel_id: number;
  employee_id: number;
}