import {data, node} from './util';
import {append, add, rollup, border, svg, size, setMargins, setPadding } from './layout';
import {scaleLinear, scaleLog} from './scales';

export function Chrt(data, node) {
  console.log('CHRT');
  this.type = 'chrt';
  this._data = data;
  this.root = node;
  this.currentNode = node;

  this.width;
  this.height;

  this._margins = {
    top: 20,
    bottom: 20,
    left: 40,
    right: 20,
  }
  this._padding = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
  this.scales = {};
  this.objects = [];

  this.scaleLinear = (name, domain, range) => {
    console.log('apply scaleLinear', name, domain, range)
    scaleLinear.apply(this, [name, domain, range]);
    this.objects.forEach(obj => obj.update());
    return this;
  };

  this.scaleLog = (name, domain, range, transformation = 'log10') => {
    console.log('apply scaleLog', name, domain, range)
    scaleLog.apply(this, [name, domain, range, transformation]);
    this.objects.forEach(obj => obj.update());
    return this;
  };

  // this.x = (domain, range) => this.scaleLinear.apply(this,['x', domain, range || [0, this.width]]);

  this.x = (domain, range, options = {}) => {
    const transformation = options ? options.transformation || 'linear' : 'linear';
    console.log('THIS X', transformation)
    switch(transformation) {
      case 'log':
      case 'log10':
      case 'log2':
        return this.scaleLog.apply(this,['x', domain, range || [0, this.width]], transformation);
      case 'linear':
      default:
        return this.scaleLinear.apply(this,['x', domain, range || [0, this.width]]);
    }

  };

  this.y = (domain, range, options = {}) => {
    const transformation = options ? options.transformation || 'linear' : 'linear';
    console.log('THIS Y', domain, range, transformation)
    switch(transformation) {
      case 'log':
      case 'log10':
      case 'log2':
        return this.scaleLog.apply(this,['y', domain, range || [this.height ,0]], transformation);
      case 'linear':
      default:
        return this.scaleLinear.apply(this,['y', domain, range || [this.height ,0]])
    }

  };

  this.update = () => {
    this.x();
    console.log('X !!!!', this.scales.x ? this.scales.x.getName() : '-')
    console.log('Y !!!!', this.scales.y ? this.scales.y.getName() : 'no name')
    console.log('Y !!!!', this.scales.y ? this.scales.y.getTransformation() : 'no transform')
    this.y(null, null, this.scales.y ? {transformation: this.scales.y.getTransformation()} : {});
    this.objects.forEach(obj => obj.update());
    return this;
  }
}

function chrt(data, node) {
  return new Chrt(data, node);
}

Chrt.prototype = chrt.prototype = {
  data,
  node,
  append,
  add,
  rollup,
  svg,
  scaleLinear,
  border,
  size,
  setWidth: width => size(width),
  setHeight: height => size(null, height),
  margins: setMargins,
  padding: setPadding,
};

export default chrt;
