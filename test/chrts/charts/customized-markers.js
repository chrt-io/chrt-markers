import * as chrt from 'chrt';
import chrtMarkers from '~/chrtMarkers'

const data = [0,2,6,2,5,9,4,5].map((d,i) => ({x:i,y:d}));

export default async function(container) {
  const chart = chrt.Chrt()
    .node(container)
    .size(600, 200)
    .add(chrt.xAxis(8))
    .add(chrt.yAxis())
    .add(
      chrt.chrtLine()
        .data(data)
        .add(
          chrtMarkers()
            .fill('#f00')
            .fillOpacity(0.5)
            .size(10)
            .stroke('#00f')
            .strokeWidth(3)
            .strokeOpacity(0.5)
        )
    );
  return chart
}
