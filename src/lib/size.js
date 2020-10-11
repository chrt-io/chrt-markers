export default function size(value) {
  if(!value) {
    return this._radius * 2;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this._radius = value / 2;
  }
  return this;
}
