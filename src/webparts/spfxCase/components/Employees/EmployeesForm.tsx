/* eslint-disable react/jsx-no-bind */
import * as React from "react";
import { FunctionComponent, useState } from "react";
import styles from "../SpfxCase.module.scss";
import { ISpfxCaseProps } from "../ISpfxCaseProps";

import { sp } from "sp-pnp-js";
// import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/items/get-all";




const EmployeesForm: FunctionComponent<ISpfxCaseProps> = (props) => {
 
  const [isVisible, setIsVisible] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeIdTitle, setEmployeeIdTitle] = useState("");
  const [employeeId] = useState(props.employeeId);

  

  React.useEffect(() => {
    setIsVisible(props.isVisible);
  }, [props.isVisible]);

 
   
   const updateEmployee = async (
     employeeIdTitle,
     employeeId,
     employeeName
   ): Promise<void> => {
     // eslint-disable-next-line @typescript-eslint/typedef
     const list = sp.web.lists.getByTitle("Employees");

     await list.items.getById(employeeId).update({
       Title: employeeIdTitle,
       name: employeeName,
     });
   };
  
  function handleSubmit(e: { preventDefault: () => void; }): void {
   e.preventDefault();
    alert(
      `For Id: ${props.employeeId} \n A name was submitted: ${employeeName} `
    );


    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    updateEmployee(employeeId, employeeName, employeeIdTitle);
    setIsVisible(!isVisible);
    
    
  }



  return (
    <section className={styles.empForm} hidden={!isVisible}>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            defaultValue={props.employeeId}
            value={employeeIdTitle}
            onChange={(e) => setEmployeeIdTitle(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            defaultValue={props.employeeName}
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
            id="empId"
            type="text"
            value={employeeId}
            // onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit" >
          Submit
        </button>
      </form>
    </section>
  );
};
export default EmployeesForm;



