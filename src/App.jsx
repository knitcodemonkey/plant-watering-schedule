import './App.css';
import PlantTimer from './plantTimer';
import { useState } from 'react';

// const populateLocalStorage = {
//   stringOfHearts: {
//     plantName: 'String of Hearts',
//     preferredDaysBetweenWaterings: 7,
//     lastWatered: new Date('4/17/2024'),
//   },
//   stringOfTurtles: {
//     plantName: 'String of Turtles',
//     preferredDaysBetweenWaterings: 7,
//     lastWatered: new Date('4/17/2024'),
//   },
//   blackVelvet: {
//     plantName: 'Alocasia Black Velvet',
//     preferredDaysBetweenWaterings: 9,
//     lastWatered: new Date('4/16/2024'),
//   },
//   redLaceBlackRose: {
//     plantName: 'Red Lace Black Rose',
//     preferredDaysBetweenWaterings: 3,
//     lastWatered: new Date('4/17/2024'),
//   },
// };

// localStorage.setItem('plants', JSON.stringify(populateLocalStorage));

function App() {
  const [allPlants, setAllPlants] = useState(
    JSON.parse(localStorage.getItem('plants'))
  );

  const setLastWatered = (plantKey) => {
    let newPlantsList = JSON.parse(JSON.stringify(allPlants));
    newPlantsList[plantKey].lastWatered = Date.now();
    localStorage.setItem('plants', JSON.stringify(newPlantsList));
    setAllPlants(newPlantsList);
  };

  const plantKeys = Object.keys(allPlants);

  return plantKeys.map((key) => {
    return (
      <PlantTimer
        {...allPlants[key]}
        setLastWatered={setLastWatered}
        key={key}
        plantKey={key}
      />
    );
  });
}

export default App;
