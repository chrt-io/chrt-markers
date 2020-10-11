export default function fill(value) {
  if(!value) {
    return this._fill;
  }

  if (typeof value === 'function') {
    // something will go here
  } else {
    this._fill = value;
  }
  return this;
}
