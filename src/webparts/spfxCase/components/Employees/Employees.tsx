/* eslint-disable @microsoft/spfx/no-async-await */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @typescript-eslint/typedef */
import * as React from "react";
import {useState, useEffect} from 'react'
import { FunctionComponent } from "react";
import styles from "../SpfxCase.module.scss";
import { ISpfxCaseProps } from "../ISpfxCaseProps";
import { IconButton } from '@fluentui/react/lib/Button';
import { SharedColors } from '@fluentui/theme';
import EmployeesForm from "./EmployeesForm";

import { sp } from "sp-pnp-js";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";

export interface IButtonExampleProps {
  disabled?: boolean;
  checked?: boolean;
}


const Employees: FunctionComponent<ISpfxCaseProps> = (props) => {
  const [employees, setEmployees] = useState(props.employees);

  // const [employeeId, setEmployeeId] = useState(0);
  // const [employeeIdTitle, setEmployeeIdTitle] = useState("")
  const [employeeName, setEmployeeName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  const [editIcon, setEditIcon] = useState("Edit");
  const [editIconColor, setEditIconColor] = useState(SharedColors.green20);

   const fetchEmployeesData = async (): Promise<void> => {
     const allItems = await sp.web.lists.getByTitle("Employees").items.getAll();
     setEmployees(allItems);
   };
  
  const deleteEmployee = (employeeId): void => {
    const employee = sp.web.lists
      .getByTitle("Employees")
      .items.getById(employeeId);
    employee.delete();
  }; 

  const handleDelete = (employee): void => {
    deleteEmployee(employee.Id);
    const newEmployees = employees.filter((emp) => employee.name !== emp.name);
    setEmployees(newEmployees);
  };

   const addEmployee = (employeeName): void => {
     sp.web.lists.getByTitle("Employees").items.add({ name: employeeName });   
     fetchEmployeesData();
     setEmployeeName("");
   };

   function handleAddSubmit(e: { preventDefault: () => void }): void {
     alert(`A name was submitted: ${employeeName} `);
     e.preventDefault();
     setBtnVisible(!btnVisible);
     addEmployee(employeeName);
   }

  const handleEdit = (employee): void => {
    editIcon === "Edit"
      ? (setEditIcon("Cancel"), setEditIconColor(SharedColors.red20))
      : (setEditIcon("Edit"), setEditIconColor(SharedColors.green20));

    setIsVisible(!isVisible);
    // setEmployeeId(employee.Title);
    setEmployeeName(employee.name);
  };

  // const updateEmployee = async (employeeId, employeeName, employeeIdTitle) => {
  //   const list = sp.web.lists.getByTitle("Employees");

  //   const emp = list.items.getById(employeeId).update({
  //     Title: employeeIdTitle,
  //     name: employeeName,
  //   });
  // };
 

  useEffect(() => {
   
    fetchEmployeesData();
  },[employees, employeeName])

  return (
    <section
      className={`${styles.spfxCase} ${
        props.hasTeamsContext ? styles.teams : ""
      }`}
    >
      <h2>Employees</h2>
      <div>
        <section className={styles.addEmpForm}>
          <button
            hidden={btnVisible}
            onClick={() => setBtnVisible(!btnVisible)}
          >
            Add Employee
          </button>
          <div hidden={!btnVisible}>
            <form onSubmit={handleAddSubmit}>
              <label>Name:</label>
              <input
                className={styles.addInput}
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />

              {/* <input type="submit" value="Submit" /> */}
              <button type="submit" className={styles.btnSubmit}>
                Submit
              </button>
            </form>
          </div>
        </section>
        {/* <div>
          <EmployeesForm
            description={""}
            isDarkTheme={false}
            environmentMessage={""}
            hasTeamsContext={false}
            userDisplayName={""}
            context={props.context}
            employees={[]}
            cars={[]}
            sales={[]}
            siteUrl={""}
            employeeName={employeeName}
            isVisible={!isVisible}
            setEmployeeName={setEmployeeName}
            employeeId={0}
          />
        </div> */}
      </div>
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
                iconProps={{ iconName: editIcon }}
                style={{ color: editIconColor }}
                // eslint-disable-next-line react/jsx-no-bind
                onClick={() => handleEdit(employee)}
              >
                Edit
              </IconButton>
            </div>
            <div>
              <EmployeesForm
                description={""}
                isDarkTheme={false}
                environmentMessage={""}
                hasTeamsContext={false}
                userDisplayName={""}
                context={props.context}
                employees={[]}
                cars={[]}
                sales={[]}
                siteUrl={""}
                employeeIdTitle = {""}
                employeeId={employee.Id}
                employeeName={employeeName}
                isVisible={isVisible}
                setEmployeeName={setEmployeeName}
                
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Employees;