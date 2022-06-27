/* eslint-disable react/jsx-no-bind */
import * as React from "react";
import { FunctionComponent, useState } from "react";
import styles from "./SpfxCase.module.scss";
import { ISpfxCaseProps,ISPCarList,ISPCarLists, ISPEmployeeLists, ISPEmployeeList, ISPSaleLists, ISPSaleList } from "./ISpfxCaseProps";
import { PrimaryButton } from "@fluentui/react";
import { SharedColors } from "@fluentui/theme";
import Employees from "./Employees/Employees";

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import Cars from "./Cars/Cars";
import Sales from "./Sales/Sales";

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
    if (!nav) setNav("Carmodels");

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
        <h1 style={{ color: SharedColors.red20 }}>Car Dealership</h1>
        <div className={styles.btnAllBox}>
          <div className={styles.btnBox}>
            <PrimaryButton
              onClick={() => setNav("Carmodels")}
              style={{ backgroundColor: SharedColors.cyanBlue10 }}
            >
              Cars
            </PrimaryButton>
          </div>
          <div className={styles.btnBox}>
            <PrimaryButton
              onClick={() => setNav("Employees")}
              style={{ backgroundColor: SharedColors.cyanBlue10 }}
            >
              Employees
            </PrimaryButton>
          </div>
          <div className={styles.btnBox}>
            <PrimaryButton
              onClick={() => setNav("Sales")}
              style={{ backgroundColor: SharedColors.cyanBlue10 }}
            >
              Sales
            </PrimaryButton>
          </div>
        </div>
      </div>

      {nav === "Carmodels" ? (
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
