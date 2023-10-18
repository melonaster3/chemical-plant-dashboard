import { Button, Grid, Input } from "@mui/material";
import {
  AllButton,
  FetchButton,
  GraphButton,
  LevelButton,
  PressureButton,
  ResetButton,
  TemperatureButton,
  TimeButton,
  TypeButton,
} from "../style/style";
import { FetchAndReset } from "./FetchAndReset";
import { DataType } from "./Data";
import { GraphType } from "./Graph";
import { TimeAvg } from "./TimeAvg";
import { TimeWindow } from "./TimeWindow";
export const TableContent = (props) => {
  return (
    <Grid xs={12} rowSpaing={2} columnSpacing={1} item container>
      <FetchAndReset
        buttonClick={props.buttonClick}
        graph={props.graph}
        setGraph={props.setGraph}
      />
      <DataType graph={props.graph} setGraph={props.setGraph} />
      <GraphType graph={props.graph} setGraph={props.setGraph} />
      <TimeAvg graph={props.graph} setGraph={props.setGraph} />
      <TimeWindow graph={props.graph} setGraph={props.setGraph} />
    </Grid>
  );
};
