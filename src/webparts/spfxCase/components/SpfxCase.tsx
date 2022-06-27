/* eslint-disable react/jsx-no-bind */
import * as React from "react";
import { FunctionComponent, useState } from "react";
import styles from "./SpfxCase.module.scss";
import { ISpfxCaseProps } from "./ISpfxCaseProps";
import { PrimaryButton } from "@fluentui/react";
import Employees from "./Employees/Employees";

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import Cars from "./Cars/Cars";
import Sales from "./Sales/Sales";

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


// import { escape } from '@microsoft/sp-lodash-subset';

const SpfxCase: FunctionComponent<ISpfxCaseProps> = (props) => {
  const {
    description,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    context,
  } = props;

  const [nav, setNav] = useState("");
  const [employees, setEmployees] = useState([]);
  const [cars, setCars] = useState([]);
  const [sales, setSales] = useState([]);

   const _getSalesListData = (): Promise<ISPSaleLists> => {
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

   const _renderSalesList = (items: ISPSaleList[]): void => {
     setSales(items);
   };

  const _getCarsListData = (): Promise<ISPCarLists> => {
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

  const _renderCarsList = (items: ISPCarList[]): void => {
    setCars(items);
  };

 
  const _getEmployeesListData = (): Promise<ISPEmployeeLists> => {
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

  const _renderEmployeesList = (items: ISPEmployeeList[]): void => {
    setEmployees(items);
  };

  const renderListAsync = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _getEmployeesListData().then((response) => {
      _renderEmployeesList(response.value);
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _getCarsListData().then((response) => {
      _renderCarsList(response.value);
    });
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _getSalesListData().then((response) => {
      _renderSalesList(response.value);
    });
  };

 

  React.useEffect(() => {
    if (!nav) setNav("Cars");

    renderListAsync();
  }, [nav]);

  return (
    <section
      className={`${styles.spfxCase} ${hasTeamsContext ? styles.teams : ""}`}
    >
      <div className={styles.welcome}>
        <img
          alt=""
          src={
            isDarkTheme
              ? require("../assets/welcome-dark.png")
              : require("../assets/welcome-light.png")
          }
          className={styles.welcomeImage}
        />
        <h1>Car Dealership</h1>
        <div className={styles.btnAllBox}>
          <div className={styles.btnBox}>
            <PrimaryButton onClick={() => setNav("Cars")}>Cars</PrimaryButton>
          </div>
          <div className={styles.btnBox}>
            <PrimaryButton onClick={() => setNav("Employees")}>
              Employees
            </PrimaryButton>
          </div>
          <div className={styles.btnBox}>
            <PrimaryButton onClick={() => setNav("Sales")}>Sales</PrimaryButton>
          </div>
        </div>
      </div>

      {
        nav === "Cars" ?
          (
        <Cars
          isDarkTheme={isDarkTheme}
          hasTeamsContext={false}
          context={context}
          environmentMessage={environmentMessage}
          description={description}
          userDisplayName={userDisplayName}
          employees={employees}
          cars={cars}
          sales={sales}
        />
      ) : nav === "Sales" ? (
        <Sales
          isDarkTheme={isDarkTheme}
          hasTeamsContext={false}
          context={context}
          environmentMessage={environmentMessage}
          description={description}
          userDisplayName={userDisplayName}
          employees={employees}
          cars={cars}
          sales={sales}
        />
      ) : (
        <Employees
          isDarkTheme={isDarkTheme}
          hasTeamsContext={false}
          context={context}
          environmentMessage={environmentMessage}
          description={description}
          userDisplayName={userDisplayName}
          employees={employees}
          cars={cars}
          sales={sales}
        />
      )}
    </section>
  );
};

export default SpfxCase;
