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
  plantName,
  preferredDaysBetweenWaterings,
  lastWatered,
  setLastWatered,
  plantKey,
}) {
  const [startTime, setStartTime] = useState(
    new Date(lastWatered) || Date.now()
  ); //based on button click
  const [timeSinceWatered, setTimeSinceWatered] = useState(
    Date.now() - startTime
  );

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

  const colorArray = interpolateColor(
    'rgb(45,81,0)',
    'rgb(250,149,20)',
    'rgb(243,44,6)',
    factor
  );

  const divStyle = {
    backgroundColor: `rgb(${colorArray.join(',')})`,
  };

  return (
    <div className="plantTimer" style={divStyle}>
      {plantName && <h1>{plantName}</h1>}
      {preferredDaysBetweenWaterings && (
        <p>
          Preferred Days Between Waterings
          <br />
          {preferredDaysBetweenWaterings} Days
        </p>
      )}
      <p>
        Last watering:
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
