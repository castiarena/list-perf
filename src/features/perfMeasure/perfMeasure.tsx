import { useSelector } from "react-redux";
import stats from "stats-lite";
import { Measure } from "./interfaces";
import { selectPerfMeasure } from "./perfMeasureSlice";

function floorMs(value: Number): Number {
  return Math.floor(Number(value) * 100) / 100;
}

const OneMeasure = ({ measure }: { measure: Measure }) => (
  <div className="perf-measures-container">
    <span>{`Phase: ${measure.phase}`}</span>{" "}
    <span>{`Actual: ${floorMs(Number(measure.actual))}ms`} </span>{" "}
    <span>{`Base: ${floorMs(Number(measure.base))}ms`}</span>{" "}
  </div>
);

const Stats = ({ data }: { data: Measure[] }) => {
  const actuals = data.map((d) => Number(d.actual));
  return (
    <div className="perf-measures-container">
      <span>{`Mean: ${floorMs(stats.mean(actuals))}`}</span>{" "}
      <span>{`Median: ${floorMs(stats.median(actuals))}`} </span>{" "}
      <span>{`90%: ${floorMs(stats.percentile(actuals, 0.9))}`}</span>{" "}
    </div>
  );
};

export const PerfMeasure = () => {
  const data = useSelector(selectPerfMeasure);
  return (
    <div>
      <div className="text-label">Virtualized list:</div>
      <div className="text-container">
        {data.reactWindow.map((m, i) => (
          <OneMeasure key={i} measure={m} />
        ))}
      </div>
      <div className="text-container stats-container">
        <Stats data={data.reactWindow} />
      </div>
      <div className="text-label">Plain list:</div>
      <div className="text-container">
        {data.plainList.map((m, i) => (
          <OneMeasure key={i} measure={m} />
        ))}
      </div>
      <div className="text-container stats-container">
        <Stats data={data.plainList} />
      </div>
    </div>
  );
};
