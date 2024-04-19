const toRGBArray = (rgbStr) => rgbStr.match(/\d+/g).map(Number);

export const interpolateColor = (colors = ['rgb(0,0,0)', 'rgb(255,255,255)'], factor = 0.5) => {
  const ratioOfColors = colors.length;
  const colorArr = colors.map((color) => toRGBArray(color))

  // You only really need to interpolate between two colors as the division is equal between them
  const index = Math.floor(colors.length * factor);
  const firstColor = colorArr[index];
  const secondColor = colorArr[index + 1];


  let result = JSON.parse(JSON.stringify(firstColor));

  // This finds the interpolation per rgb number value
  for (let i = 0; i < 3; i++) {
    const interpolation = Math.round(
      firstColor[i] + factor * (secondColor[i] - firstColor[i])
    );
    result[i] = interpolation;
  }

  return `rgb(${result.join(',')})`;
};

export default interpolateColor;

// const colorArray = interpolateColor(["rgb(67, 93, 67)", "rgb(183, 20, 57)", "rgb(183, 20, 57)"], 5);