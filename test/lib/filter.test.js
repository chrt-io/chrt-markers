import * as chrt from 'chrt';
import chrtMarkers from '~/chrtMarkers'

describe('Testing showMarkers', () => {

  it('Filter is a function', () => {
    const chartMarkers = new chrtMarkers();

    // defauly markersFilter always return true
    expect(chartMarkers.markersFilter(10,1)).toEqual(true);

    const filter = (d,i) => !(i % 2);

    chartMarkers.showMarkers(filter);

    expect(chartMarkers.markersFilter(10,0)).toEqual(true);
    expect(chartMarkers.markersFilter(10,1)).toEqual(false);

  })

  it('Filter is a boolean', () => {
    const chartMarkers = new chrtMarkers();

    // defauly markersFilter always return true
    expect(chartMarkers.markersFilter(10,1)).toEqual(true);

    chartMarkers.showMarkers(false);

    expect(chartMarkers.markersFilter(10,0)).toEqual(false);
    expect(chartMarkers.markersFilter(10,1)).toEqual(false);

  })

  it('Filter is a finite', () => {
    const chartMarkers = new chrtMarkers();

    // defauly markersFilter always return true
    expect(chartMarkers.markersFilter(10,1)).toEqual(true);

    chartMarkers.showMarkers(10);

    expect(chartMarkers.markersFilter(10)).toEqual(true);
    expect(chartMarkers.markersFilter(11)).toEqual(false);
    expect(chartMarkers.markersFilter(Infinity)).toEqual(false);
  })



  it('Filter is an array', () => {
    const chartMarkers = new chrtMarkers();

    // defauly markersFilter always return true
    expect(chartMarkers.markersFilter(10,1)).toEqual(true);

    chartMarkers.showMarkers([10, 20, 30])

    expect(chartMarkers.markersFilter(20)).toEqual(true);
    expect(chartMarkers.markersFilter(15)).toEqual(false);

  })

  it('Filter is a null', () => {
    const chartMarkers = new chrtMarkers();

    // defauly markersFilter always return true
    expect(chartMarkers.markersFilter(null)).toEqual(true);

    chartMarkers.showMarkers(null);

    expect(chartMarkers.markersFilter(null,0)).toEqual(true);
    expect(chartMarkers.markersFilter(10,1)).toEqual(false);

  })

})

it('Testing hideMarkers', () => {

  const chartMarkers = new chrtMarkers();

  // defauly markersFilter always return true
  expect(chartMarkers.markersFilter(10,1)).toEqual(true);

  chartMarkers.hideMarkers();

  expect(chartMarkers.markersFilter(10,1)).toEqual(false);
})

describe('Testing position markers', () => {
  it('Testing firstMarker', () => {
    const chartMarkers = new chrtMarkers();

    // defauly markersFilter always return true
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(true);

    chartMarkers.firstMarker();

    expect(chartMarkers.markersFilter(0,0,[0,5,10])).toEqual(true);
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(false);

    chartMarkers.firstMarker(false);

    expect(chartMarkers.markersFilter(0,0,[0,5,10])).toEqual(false);
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(true);
  })

  it('Testing lastMarker', () => {
    const chartMarkers = new chrtMarkers();

    // defauly markersFilter always return true
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(true);

    chartMarkers.lastMarker();

    expect(chartMarkers.markersFilter(10,2,[0,5,10])).toEqual(true);
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(false);

    chartMarkers.lastMarker(false);

    expect(chartMarkers.markersFilter(10,2,[0,5,10])).toEqual(false);
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(true);
  })

  it('Testing firstAndlastMarker', () => {
    const chartMarkers = new chrtMarkers();

    // defauly markersFilter always return true
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(true);

    chartMarkers.firstAndLastMarkers();

    expect(chartMarkers.markersFilter(0,0,[0,5,10])).toEqual(true);
    expect(chartMarkers.markersFilter(10,2,[0,5,10])).toEqual(true);
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(false);

    chartMarkers.firstAndLastMarkers(false);

    expect(chartMarkers.markersFilter(0,0,[0,5,10])).toEqual(false);
    expect(chartMarkers.markersFilter(10,2,[0,5,10])).toEqual(false);
    expect(chartMarkers.markersFilter(5,1,[0,5,10])).toEqual(true);
  })
})
