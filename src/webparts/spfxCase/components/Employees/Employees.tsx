import * as React from "react";
import {useState} from 'react'
import { FunctionComponent } from "react";
import styles from "../SpfxCase.module.scss";
import { ISpfxCaseProps } from "../ISpfxCaseProps";
import { IconButton } from '@fluentui/react/lib/Button';
import { SharedColors } from '@fluentui/theme';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}


const Employees: FunctionComponent<ISpfxCaseProps> = (props) => {

  const [employees, setEmployees] = useState(props.employees);
  
  const handleDelete = (employee): void => {
    // eslint-disable-next-line @typescript-eslint/typedef
    const newEmployees  = employees.filter((emp) => employee.name !== emp.name);
    setEmployees(newEmployees);
  };

    return (
      <section
        className={`${styles.spfxCase} ${
          props.hasTeamsContext ? styles.teams : ""
        }`}
      >
        <h2>Employees</h2>
        <div className={styles.theEmployeesEmp}>
          {employees.map((employee) => (
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
              <div className={styles.crudEmployeeBtn}>
                <div>
                  <IconButton
                    iconProps={{ iconName: "Delete" }}
                    style={{ color: SharedColors.red20 }}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => handleDelete(employee)}
                  >
                    Delete
                  </IconButton>
                </div>
                <IconButton
                  iconProps={{ iconName: "Edit" }}
                  style={{ color: SharedColors.green20 }}
                >
                  Edit
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  
}

export default Employees;