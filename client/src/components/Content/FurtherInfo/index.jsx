import { Grid, Input, TextField } from "@mui/material";
import {
  AverageValueInfo,
  AverageValueTitle,
  TimeButton,
} from "../../style/style";

export const FurtherInfo = (props) => {
  const graph = props.graph;

  let unit = "";
  if (graph.info === "Temperature") {
    unit = "°C";
  } else if (graph.info === "Pressure") {
    unit = "kPa";
  } else if (graph.info === "Level") {
    unit = "L";
  }
  const roundToTwoDecimals = (value) => {
    if (
      typeof value !== "number" ||
      !graph.type ||
      !graph.info ||
      !graph.timeFrame
    ) {
      return "";
    }
    return parseFloat(value).toFixed(2) + unit;
  };

  return (
    <>
      <Grid
        xs={12}
        marginBottom="2rem"
        item
        container
        rowSpaing={4}
        columnSpacing={4}
      >
        <Grid xs={6} item container>
          <Grid xs={12} item container>
            <Grid xs={6} item container>
              <AverageValueTitle>Average</AverageValueTitle>
            </Grid>
            <Grid xs={6} item container>
              <AverageValueInfo>
                {roundToTwoDecimals(graph.avg)}
              </AverageValueInfo>
            </Grid>
          </Grid>
          <Grid xs={12} item container>
            <Grid xs={6} item container>
              <AverageValueTitle>Max Value</AverageValueTitle>
            </Grid>
            <Grid xs={6} item container>
              <AverageValueInfo>
                {roundToTwoDecimals(graph.max)}
              </AverageValueInfo>
            </Grid>
          </Grid>
          <Grid xs={12} item container>
            <Grid xs={6} item container>
              <AverageValueTitle>Min Value</AverageValueTitle>
            </Grid>
            <Grid xs={6} item container>
              <AverageValueInfo>
                {roundToTwoDecimals(graph.min)}
              </AverageValueInfo>
            </Grid>
          </Grid>
        </Grid>
      </Grid>{" "}
    </>
  );
};
