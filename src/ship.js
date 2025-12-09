function ship(length) {
  return {
    length,
    hits: 0,
    sunk: null,
    hit() {
      this.hits++;

      // isSunk() {
      if (this.hits >= this.length) {
        this.sunk = true;
      }
    },
  };
}
export { ship };
// module.exports = ship;
