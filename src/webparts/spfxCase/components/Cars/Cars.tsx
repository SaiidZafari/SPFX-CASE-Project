import * as React from "react";
import { FunctionComponent } from "react";
import styles from "../SpfxCase.module.scss";
import { ISpfxCaseProps } from "../ISpfxCaseProps";


const Cars: FunctionComponent<ISpfxCaseProps> = (props) => {
    return (
      <section
        className={`${styles.spfxCase} ${
          props.hasTeamsContext ? styles.teams : ""
        }`}
      >
        <h2>Cars</h2>

        <div className={styles.theEmployees}>
          <div className={styles.theCarBox}>
            {props.cars.map((car, index) => (
              <div className={styles.theCar} key={index}>
                <h3>{car.brand}</h3>
                <h3>{car.model}</h3>
                <h3>{car.price} kr.</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
export default Cars;