import { chrtGeneric } from 'chrt-core';
import {
  fill,
  size,
  stroke,
  strokeWidth,
  showMarkers,
  hideMarkers,
  firstMarker,
  lastMarker,
  firstAndLastMarkers
} from './lib';
import { createSVG as create } from '~/layout';

const DEFAULT_RADIUS = 2;
const DEFAULT_FILL_COLOR = '#000';
const DEFAULT_STROKE = '#000';
const DEFAULT_STROKE_OPACITY = 1;
const DEFAULT_STROKE_WIDTH = 1;
const DEFAULT_FILL_OPACITY = 1;

function chrtMarkers() {
  chrtGeneric.call(this);
  // console.log('HI WE ARE MARKERS', this);
  this.type = 'markers';
  this.markers = [];
  this.g = null;
  this.markersFilter = () => true;

  this.draw = () => {
    // console.log('DRAW MARKERS', this.parentNode.data(), this.parentNode.parentNode._data);
    // console.log(this)
    const parentData = this.parentNode.data();
    // this might be broken when only local data to the component is updated - to be tested
    const data= parentData.length ? parentData : (this.parentNode.parentNode._data || []);
    const radius = this._radius || DEFAULT_RADIUS;
    const fill = this._fill || this.parentNode.stroke || DEFAULT_FILL_COLOR;
    const opacity = this._opacity || this.parentNode.strokeOpacity || DEFAULT_FILL_OPACITY;
    const stroke = this._stroke || this.parentNode.stroke || DEFAULT_STROKE;
    const strokeOpacity = this._strokeOpacity || this.parentNode.strokeOpacity || DEFAULT_STROKE_OPACITY;
    const strokeWidth =
      this._strokeWidth || this.parentNode.strokeWidth || DEFAULT_STROKE_WIDTH;

    if (!this.g) {
      this.g = create('g');
      this.parentNode.g.appendChild(this.g);
    }

    data.forEach((marker, i) => {
      if (this.markers[i]) {
        // if the marker exists, just update its data
        this.markers[i].marker = marker;
      } else {
        // if the marker does not exists, create a new one
        const circle = create('circle');
        this.markers.push({
          circle,
          marker
        });
        this.g.appendChild(circle);
      }
    });

    this.markers
      .filter((marker, i, arr) => this.markersFilter(marker.marker, i, arr))
      .forEach(d => {
        const cx = this.parentNode.parentNode.scales.x[this.parentNode.scales.x](
          d.marker[this.parentNode.fields.x]
        );
        d.circle.setAttribute(
          'cx',
          isNaN(cx) ? 0 : cx,
        );

        const cy = this.parentNode.parentNode.scales.y[this.parentNode.scales.y](
          d.marker[this.parentNode.fields.y]
        );
        d.circle.setAttribute(
          'cy',
          isNaN(cy) ? 0 : cy,
        );

        d.circle.setAttribute('fill', fill);
        d.circle.setAttribute('fill-opacity', opacity);
        d.circle.setAttribute('r', radius);
        d.circle.setAttribute('stroke', stroke);
        d.circle.setAttribute('stroke-width', strokeWidth);
        d.circle.setAttribute('stroke-opacity', strokeOpacity);
      });

    return this.parentNode;
  };
}

chrtMarkers.prototype = Object.create(chrtGeneric.prototype);
chrtMarkers.prototype.constructor = chrtMarkers;
chrtMarkers.parent = chrtGeneric.prototype;

chrtMarkers.prototype = Object.assign(chrtMarkers.prototype, {
  fill,
  size,
  stroke,
  strokeWidth,
  showMarkers,
  hideMarkers,
  firstMarker,
  lastMarker,
  firstAndLastMarkers
});

// export default chrtMarkers;

export default function() {
  return new chrtMarkers();
}
