const toRGBArray = (rgbStr) => rgbStr.match(/\d+/g).map(Number);

export const interpolateColor = (color1, color2, color3, factor = 0.5) => {
  const color1arr = toRGBArray(color1);
  const color2arr = toRGBArray(color2);
  const color3arr = toRGBArray(color3);

  const firstColor = factor <= 0.5 ? color1arr : color2arr;
  const secondColor = factor > 0.5 ? color2arr : color3arr;
  let result = JSON.parse(JSON.stringify(firstColor));

  for (let i = 0; i < 3; i++) {
    const interpolation = Math.round(
      firstColor[i] + factor * (secondColor[i] - firstColor[i])
    );

    result[i] = interpolation;
  }

  return result;
};

// const colorArray = interpolateColor("rgb(67, 93, 67)", "rgb(183, 20, 57)", "rgb(183, 20, 57)", 5);

export default interpolateColor;
