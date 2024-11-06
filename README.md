# chrt-markers

Component for creating markers in chrt charts. Markers are visual elements (typically circles) used to highlight significant points in a chart, making data points more visible or emphasizing specific values. Markers can be added to any chart component (lines, bars, columns) and can be customized in size, color, and appearance.

### Observable Examples and Documentation:

- [Chrt Markers - Observable](https://observablehq.com/d/046f2837f6c66bd4?collection=@chrt/chrt)
- [Introducing Chrt - Observable](https://observablehq.com/@chrt/introducing-chrt?collection=@chrt/chrt)

## Installing

For use with Webpack, Rollup, or other Node-based bundlers, `chrt-markers` can be installed as a standalone module via a package manager such as Yarn or npm.

```bash
npm install chrt-markers chrt-core
```

`chrt-markers` can be used as part of the `chrt` package:

```bash
npm install chrt
```

## Usage

### ES6 / Bundlers (Webpack, Rollup, etc.)

```js
import Chrt from "chrt-core";
import { chrtMarkers } from "chrt-markers";

// Add markers to a line chart
Chrt().add(chrt.line().data(data).add(chrtMarkers()));
```

## API Reference

### Creation

#### `chrtMarkers()`

Creates a new markers component that can be added to any chart element.

```js
// Basic markers
chrt.line().add(chrtMarkers());

// Customized markers
chrt.line().add(chrtMarkers().size(5).fill("#ff0000"));
```

### Styling

#### `.size([value])` / `.radius([value])`

Sets the size (radius) of markers. Both methods are aliases.

```js
chrtMarkers().size(5); // 5 pixel radius

// Size based on data
chrtMarkers().size((d, i) => d.importance * 2);
```

#### `.fill([color])` / `.fillOpacity([value])`

Sets the fill color and opacity of markers.

```js
chrtMarkers().fill("#ff0000").fillOpacity(0.5);

// Color based on data
chrtMarkers().fill((d) => (d.value > 100 ? "#ff0000" : "#0000ff"));
```

#### `.stroke([color])` / `.strokeWidth([value])` / `.strokeOpacity([value])`

Sets the stroke (border) properties of markers.

```js
chrtMarkers().stroke("#000000").strokeWidth(2).strokeOpacity(0.8);
```

### Filtering

#### `.showMarkers([filter])` / `.filter([filter])`

Controls which markers are displayed. Both methods are aliases.

```js
// Show specific markers
chrtMarkers().showMarkers((d) => d.value > 100);

// Show only even indices
chrtMarkers().filter((d, i) => i % 2 === 0);

// Show specific values
chrtMarkers().filter([10, 20, 30]);
```

#### `.hideMarkers([filter])`

Hides markers based on a filter condition (inverse of showMarkers).

```js
// Hide markers below threshold
chrtMarkers().hideMarkers((d) => d.value < 100);
```

#### `.firstMarker([show])` / `.lastMarker([show])`

Shows or hides first/last markers.

```js
// Show only first marker
chrtMarkers().firstMarker();

// Show only last marker
chrtMarkers().lastMarker();
```

#### `.firstAndLastMarkers([show])`

Shows or hides both first and last markers.

```js
// Show only first and last markers
chrtMarkers().firstAndLastMarkers();
```

### Examples

#### Basic Markers on Line Chart

```js
Chrt()
  .data(data)
  .add(chrt.line().add(chrtMarkers().size(3).fill("#ff0000")));
```

#### Customized Markers

```js
Chrt().add(
  chrt
    .line()
    .data(data)
    .add(
      chrtMarkers()
        .fill("#ff0000")
        .fillOpacity(0.5)
        .size(10)
        .stroke("#0000ff")
        .strokeWidth(3)
        .strokeOpacity(0.5),
    ),
);
```

#### Markers on Bar Charts

```js
Chrt().add(
  chrt
    .chrtBars()
    .data(data)
    .add(
      chrtMarkers()
        .size(5)
        .filter((d) => d.value > threshold),
    ),
);
```

#### Filtered Markers

```js
Chrt().add(
  chrt.line().data(data).add(
    chrtMarkers()
      .firstAndLastMarkers() // Show only first and last points
      .size(8)
      .fill("#ff0000"),
  ),
);
```
