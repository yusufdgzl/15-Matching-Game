function Random(data) {
  const indices = data.map((_, index) => index);

  indices.sort(() => Math.random() - 0.5);

  const shuffledProducts = indices.map((index) => data[index]);

  return shuffledProducts;
}

export default Random;
