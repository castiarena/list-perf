import { useSelector } from "react-redux";
import { Measure } from "./interfaces";
import { selectPerfMeasure } from "./perfMeasureSlice";

const OneMeasure = ({ measure }: { measure: Measure }) => (
  <div className="perf-measures-container">
    <span>{`Phase: ${measure.phase}`}</span>{" "}
    <span>
      {`Actual: ${Math.floor(Number(measure.actual) * 100) / 100}ms`}{" "}
    </span>{" "}
    <span>{`Base: ${Math.floor(Number(measure.base) * 100) / 100}ms`}</span>{" "}
  </div>
);

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
      <div className="text-label">Plain list:</div>
      <div className="text-container">
        {data.plainList.map((m, i) => (
          <OneMeasure key={i} measure={m} />
        ))}
      </div>
    </div>
  );
};
