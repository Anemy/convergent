// Only 10 million possible shapes right now... I think that's ok.
// We can just increase if we need more.
const defaultSeedRange = 9999999;
export function createRandomSeed(range, existingSeed) {
  let randomRange = (range === null) ? defaultSeedRange : (range || 0);

  let seed = 1 + Math.floor(Math.random() * randomRange);

  // To avoid repeating seeds.
  if (existingSeed !== null) {
    while (seed === existingSeed && range > 2) {
      seed = 1 + Math.floor(Math.random() * randomRange);
    }
  }

  return seed;
}
