import { useState, useEffect } from 'react';
import './App.css';
import { timeFormat, timeSinceFormat } from './utils/dateTimeFormat.js';
import { interpolateColor } from './utils/interpolateColor.js';

const percentageBetweenDays = (
  preferredDaysBetweenWaterings,
  timeSinceWatered
) => {
  // time diff between was and is watered
  const timeBetweenWaterings =
    preferredDaysBetweenWaterings * 24 * 60 * 60 * 1000;

  return (timeSinceWatered / timeBetweenWaterings).toFixed(2);
};

/**
 *
 */
function PlantTimer({
  plantName = "Oh No! Time to buy plants!",
  preferredDaysBetweenWaterings,
  lastWatered = Date.now(),
  setLastWatered,
  plantKey,
}) {
  const [startTime, setStartTime] = useState(new Date(lastWatered)); //based on button click
  const [timeSinceWatered, setTimeSinceWatered] = useState(Date.now() - startTime);

  const timeToNextWatering = preferredDaysBetweenWaterings * 24 * 60 * 60 * 1000

  useEffect(() => {
    const intervalId = setInterval(
      () => setTimeSinceWatered(Date.now() - startTime),
      1000 * 60 // every minute
    );
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedTimeSince = timeSinceFormat(timeSinceWatered);
  const factor = percentageBetweenDays(
    preferredDaysBetweenWaterings,
    timeSinceWatered
  );

  const colors = [
    'rgb(73,138,94)',
    'rgb(149,179,137)',  
    'rgb(185,197,155)', 
    'rgb(220,176,93)', 
    'rgb(211,127,111)',
    'rgb(147,0,18)'
  ]

  const divStyle = {
    backgroundColor: interpolateColor(colors,factor),
  };

  return (
    <div className="plantTimer" style={divStyle}>
      <h1>{plantName}</h1>
      {preferredDaysBetweenWaterings && (
        <p>{preferredDaysBetweenWaterings} Days Between Waterings</p>
      )}
      <p>
        Last watered:
        <br />
        {timeFormat(startTime)}
      </p>
      <p>
        Time since last watering:
        <br />
        {formattedTimeSince.formatted}
      </p>

      <form
        className="card"
        onSubmit={() => {
          setStartTime(Date.now());
          setLastWatered(plantKey);
        }}
      >
        <button type="submit">{formattedTimeSince.today}</button>
      </form>
    </div>
  );
}

export default PlantTimer;
