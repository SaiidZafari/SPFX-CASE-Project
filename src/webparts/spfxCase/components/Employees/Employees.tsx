import * as React from "react";
import { FunctionComponent } from "react";
import styles from "../SpfxCase.module.scss";
import { ISpfxCaseProps } from "../ISpfxCaseProps";


const Employees: FunctionComponent<ISpfxCaseProps> = (props) => {
     
    return (
      <section
        className={`${styles.spfxCase} ${props.hasTeamsContext ? styles.teams : ""}`}
      >
        <h2>Employees</h2>
        <div className={styles.theEmployeesEmp}>
          {props.employees.map((employee) => (
            <div className={styles.theEmployee} key={employee.Title}>
              <img
                alt=""
                src={
                  props.isDarkTheme
                    ? require("../../assets/welcome-dark.png")
                    : require("../../assets/welcome-light.png")
                }
                className={styles.welcomeImageEmp}
              />
              <h2>{employee.name}</h2>
            </div>
          ))}
        </div>
      </section>
    );
  
}

export default Employees;