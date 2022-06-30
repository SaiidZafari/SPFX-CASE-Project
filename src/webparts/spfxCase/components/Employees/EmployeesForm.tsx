/* eslint-disable react/jsx-no-bind */
import * as React from "react";
import { FunctionComponent, useState } from "react";
import styles from "../SpfxCase.module.scss";
import { ISpfxCaseProps } from "../ISpfxCaseProps";


const EmployeesForm: FunctionComponent<ISpfxCaseProps> = (props) => {
 
   const [isVisible, setIsVisible] = useState(false);
  const [employeeName, setEmployeeName] = useState("");

  React.useEffect(() => {
    setIsVisible(props.isVisible);
  }, [props.isVisible]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function handleSubmit(e: { preventDefault: () => void; }) {
    alert(
      `For Id: ${props.employeeId} \n A name was submitted: ${employeeName} `
    );
    e.preventDefault();
    setIsVisible(!isVisible);
  }

  // eslint-disable-next-line no-return-assign
  return (
    <section className={styles.empForm} hidden={!isVisible }>
      <form onSubmit={handleSubmit}>
        <label>
          Id:
          <input
            type="text"
            value={props.employeeId}
            // onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </label>
        {/* <input type="submit" value="Submit" /> */}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};
export default EmployeesForm;



