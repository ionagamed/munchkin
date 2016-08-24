/**
 * Created by ionagamed on 8/14/16.
 */

export default function (sides) {
    sides = sides || 6;
    // TODO: add PRNG with bias to numbers, which haven't been dropped in a while
    return Math.floor(Math.random() * sides + 1);
}