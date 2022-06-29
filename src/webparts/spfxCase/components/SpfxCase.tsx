/* eslint-disable react/jsx-no-bind */
import * as React from "react";
import { FunctionComponent, useState } from "react";
import styles from "./SpfxCase.module.scss";
import { ISpfxCaseProps } from "./ISpfxCaseProps";
import { PrimaryButton } from "@fluentui/react";
import { SharedColors } from "@fluentui/theme";
import Employees from "./Employees/Employees";
import {
  _getSalesListData,
  _getEmployeesListData,
  _getCarsListData,
} from "./DataBase/GetData";

import Cars from "./Cars/Cars";
import Sales from "./Sales/Sales";

const SpfxCase: FunctionComponent<ISpfxCaseProps> = (props) => {
  const {
    description,
    isDarkTheme,
    environmentMessage,
    hasTeamsContext,
    userDisplayName,
    context,
    siteUrl
  } = props;

  const [nav, setNav] = useState("");
  const [employees, setEmployees] = useState([]);
  const [cars, setCars] = useState([]);
  const [sales, setSales] = useState([]);

 
  React.useEffect(() => {
    if (!nav) setNav("Carmodels");

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _getSalesListData(context).then((response) => setSales(response.value));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _getCarsListData(context).then((response) => setCars(response.value));
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    _getEmployeesListData(context).then((response) =>setEmployees(response.value));

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
          siteUrl={siteUrl}
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
          siteUrl={siteUrl}
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
          siteUrl={siteUrl}
        />
      )}
    </section>
  );
};

export default SpfxCase;
