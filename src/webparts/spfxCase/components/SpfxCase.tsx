/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @microsoft/spfx/no-async-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-no-bind */
import * as React from "react";
import { FunctionComponent, useState, SetStateAction } from "react";
import styles from "./SpfxCase.module.scss";
import { ISpfxCaseProps, ISPEmployeeList } from "./ISpfxCaseProps";
import { PrimaryButton } from "@fluentui/react";
import { SharedColors } from "@fluentui/theme";
import Employees from "./Employees/Employees";

import { sp } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";

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
    siteUrl,
  } = props;

  const [nav, setNav] = useState("");
  const [employees, setEmployees] = useState([]);
  const [cars, setCars] = useState([]);
  const [sales, setSales] = useState([]);

  const fetchEmployeesData = async () => {
    const allItems = await sp.web.lists.getByTitle("Employees").items.getAll();
    setEmployees(allItems);
  };

  const fetchCarsData = async () => {
    const allItems = await sp.web.lists.getByTitle("Carmodels").items.getAll();
    setCars(allItems);
  };

  const fetchSalesData = async () => {
    const allItems = await sp.web.lists.getByTitle("Sales").items.getAll();
    setSales(allItems);
  };

  React.useEffect(() => {
    if (!nav) setNav("Carmodels");

    fetchSalesData();
    fetchEmployeesData();
    fetchCarsData();
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
          employeeId={0}
          employeeName={""}
          isVisible={false}
          setEmployeeName={function (value: SetStateAction<string>): void {
            throw new Error("Function not implemented.");
          }}
          employeeIdTitle={""}
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
          employeeId={0}
          employeeName={""}
          isVisible={false}
          setEmployeeName={function (value: SetStateAction<string>): void {
            throw new Error("Function not implemented.");
          }}
          employeeIdTitle={""}
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
          employeeId={0}
          employeeName={""}
          isVisible={false}
          employeeIdTitle={""}
          setEmployeeName={function (value: SetStateAction<string>): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </section>
  );
};

export default SpfxCase;
