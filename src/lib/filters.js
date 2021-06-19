// showMarkers and hideTicks can get different type of parameters and they filter the markers based on the parameters
export default function showMarkers(filter) {
  // default true
  if (typeof filter === 'undefined') {
    this.markersFilter = () => true;
    return this;
  }

  // filter-in with a function
  // showMarkers((d,i) => !(i % 2))
  if (typeof filter === 'function') {
    this.markersFilter = (d, i, arr) => filter(d, i, arr);
    return this;
  }

  // show/hide all markers
  // showMarkers(false|true)
  if (typeof filter === 'boolean') {
    this.markersFilter = () => filter;
    return this;
  }

  // show only one marker
  // showMarkers(10)
  if (Number.isFinite(filter)) {
    this.markersFilter = d => filter === d;
    return this;
  }

  // show based on an array of values
  // showMarkers([10, 20, 30])
  if (Array.isArray(filter)) {
    this.markersFilter = d => filter.indexOf(d) > -1;
    return this;
  }

  // generic, valid for all other types, including null
  this.markersFilter = d => filter === d;
  return this;
}

export function hideMarkers(filter) {
  showMarkers.call(this, filter);
  const markersFilter = this.markersFilter;
  this.markersFilter = (d, i, arr) => !markersFilter(d, i, arr);

  return this;
}

export function firstMarker(show = true) {
  // // console.log('FIRST TICK', this, show)
  if(show) {
    showMarkers.call(this, (d,i) => i === 0);
  } else {
    hideMarkers.call(this, (d,i) => i === 0);
  }
  return this;
}

export function lastMarker(show = true) {
  if(show) {
    showMarkers.call(this, (d,i,arr) => i === arr.length - 1);
  } else {
    hideMarkers.call(this, (d,i,arr) => i === arr.length - 1);
  }

  return this;
}

export function firstAndLastMarkers(show = true) {
  if(show) {
    showMarkers.call(this, (d,i,arr) => i === 0 || i === arr.length - 1);
  } else {
    hideMarkers.call(this, (d,i,arr) => i === 0 || i === arr.length - 1);
  }

  return this;
}
