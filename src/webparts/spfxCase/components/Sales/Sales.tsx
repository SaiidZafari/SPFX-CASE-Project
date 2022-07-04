import * as React from "react";
import { FunctionComponent } from "react";
import styles from "../SpfxCase.module.scss";
import { ISpfxCaseProps } from "../ISpfxCaseProps";

const Sales: FunctionComponent<ISpfxCaseProps> = (props) => {
    const{cars, employees, sales } = props;
  return (
    <section
      className={`${styles.spfxCase} ${
        props.hasTeamsContext ? styles.teams : ""
      }`}
    >
      <h2>Sales</h2>
      <div className={styles.theEmployees}>
        {employees.map((employee) => (
          <div className={styles.theEmployee} key={employee.Title}>
            <h2>{employee.name}</h2>
            <div className={styles.theCarBox}>
              {sales.map((sale) =>
                cars.map((car) =>
                  car.Title.toString() === sale.carmodel_id.toString() &&
                  (employee.Id-4).toString() === sale.employee_id.toString() ? (
                    <div>
                      <div className={styles.theCar} key={car.brand}>
                        <h3>{car.brand}</h3>
                        <h3>{car.model}</h3>
                        <h3>{car.price} kr.</h3>
                      </div>
                    </div>
                  ) : (
                    ""
                  )
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Sales;
