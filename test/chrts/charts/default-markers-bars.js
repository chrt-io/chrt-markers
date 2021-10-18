import * as chrt from 'chrt';
import chrtMarkers from '../../../src/chrtMarkers'

const data = [0,2,6,2,5,9,4,5].map((d,i) => ({x:i,y:d}));

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .data(data)
    .size(600, 200)
    .add(chrt.xAxis(8))
    .add(chrt.yAxis())
    .add(
      chrt.chrtBars()
        .add(chrtMarkers())
    );
  return chart
}
