interface IsAnyoneAlive {
  (field: number[][]): boolean;
}

// Проверить - "Есть кто живой?".
const isAnyoneAlive: IsAnyoneAlive = (field) => {
  for (let i = 0; i < field.length; i += 1) {
    const row = field[i];
    for (let j = 0; j < row.length; j += 1) {
      const cell = row[j];
      if (cell) {
        return true;
      }
    }
  }
  return false;
};

export { isAnyoneAlive };
