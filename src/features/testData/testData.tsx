import {
  CSSProperties,
  useEffect,
  Profiler,
  ProfilerOnRenderCallback,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import { AppDispatch } from "../../app/store";
import { User } from "./interfaces";
import { PerfCase } from "../perfMeasure/interfaces";
import { fetchUsers, isLoading, selectUsers } from "./testDataSlice";
import { addMeasure } from "../perfMeasure/perfMeasureSlice";
import { Loader } from "../../Loader";

const ListItem = ({ name, style }: { name: string; style: CSSProperties }) => (
  <li style={style}>{name}</li>
);

const ReactWindowList = ({ data }: { data: User[] }) => (
  <List
    height={490}
    itemSize={35}
    width={300}
    innerElementType="ul"
    itemData={data}
    itemCount={data.length}
    className="page-container"
  >
    {({
      data,
      index,
      style,
    }: {
      data: User[];
      index: number;
      style: CSSProperties;
    }) => {
      return (
        <ListItem key={data[index].id} style={style} name={data[index].name} />
      );
    }}
  </List>
);

const PlainList = ({ data }: { data: User[] }) => {
  return (
    <div>
      {data.map((u, i) => (
        <ListItem
          key={i}
          name={u.name}
          style={{ display: "list-item", height: "35px" }}
        />
      ))}
    </div>
  );
};

export const TestDataList = () => {
  const data = useSelector(selectUsers);
  const loader = useSelector(isLoading);
  const dispatch = useDispatch<AppDispatch>();

  const [perfCase, setPerfCase] = useState<PerfCase>("reactWindow");
  const [key, updateKey] = useState<number>(1);
  const forceUpdate = (times: number) => {
    if (times > 0) {
      flushSync(() => updateKey((k) => k + 1));
      forceUpdate(times - 1);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  type OnRenderGenerator = (pc: PerfCase) => ProfilerOnRenderCallback;
  const onRender: OnRenderGenerator =
    (pc) => (_id, phase, actualDuration, baseDuration) => {
      dispatch(
        addMeasure({
          case: pc,
          measure: {
            phase,
            actual: actualDuration,
            base: baseDuration,
          },
        })
      );
    };

  const renderList = () => {
    switch (perfCase) {
      case "reactWindow":
        return (
          <Profiler
            key={key}
            id="reactWindowList"
            onRender={onRender("reactWindow")}
          >
            <ReactWindowList data={data} />
          </Profiler>
        );
      case "plainList":
        return (
          <Profiler key={key} id="plainList" onRender={onRender("plainList")}>
            <PlainList data={data} />
          </Profiler>
        );
      default:
        return <></>;
    }
  };

  return (
    <div>
      <div>
        <span className="text-label">Select rendering case:</span>
        <select
          className="select-list"
          value={perfCase}
          onChange={(e) => setPerfCase(e.target.value as PerfCase)}
        >
          <option value={"reactWindow"}>Virtualized list</option>
          <option value={"plainList"}>Plain list</option>
        </select>
      </div>
      <div>
        <span className="text-label">Renders: {key}</span>
        <button onClick={() => forceUpdate(10)}>Rerender 10 times</button>
      </div>

      <div className="list-container">
        {loader === "loading" ? <Loader /> : renderList()}
      </div>
    </div>
  );
};
