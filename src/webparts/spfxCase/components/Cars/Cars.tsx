import * as React from "react";
import {useState} from 'react'
import { FunctionComponent } from "react";
import styles from "../SpfxCase.module.scss";
import { ISpfxCaseProps } from "../ISpfxCaseProps";
import { IconButton } from '@fluentui/react/lib/Button';
import { SharedColors } from '@fluentui/theme';
import { SpinnerBasicExample } from "./SpinnerBasicExample";



const Cars: FunctionComponent<ISpfxCaseProps> = (props) => {
   const {cars} = props

  const [carModels, setCarModels] = useState([]);

 
  const handleDelete = (car): void => {      
    // eslint-disable-next-line @typescript-eslint/typedef
    const newCarModels = carModels.filter(
      (carModel) => carModel.Title !== car.Title
    );
    setCarModels(newCarModels);
  }; 
  
  React.useEffect(() => {
    if (carModels.length < 1 ) {
      setCarModels(cars);
    }
  }, [carModels.length, cars]);

  const loadCars = (): void => {
    // eslint-disable-next-line no-unused-expressions
    carModels.length < 1 ? <SpinnerBasicExample /> : ""
  }

    return  (
      <section
        className={`${styles.spfxCase} ${
          props.hasTeamsContext ? styles.teams : ""
        }`}
      >
        <h2>Carmodels</h2>

        <div className={styles.theEmployees}>
          <div className={styles.theCarBox}>
            {/* {(carModels.length > 0 ? carModels : cars).map( */}
            {carModels.map((car, index) => (
              <div key={index}>
                <div className={styles.theCar}>
                  <h3>{car.brand}</h3>
                  <h3>{car.model}</h3>
                  <h3>{car.price} kr.</h3>
                  <div className={styles.crudCarBtn}>
                    <div>
                      <IconButton
                        iconProps={{ iconName: "Delete" }}
                        style={{ color: SharedColors.red20 }}
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={() => handleDelete(car)}
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
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
export default Cars;