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
      graph.info === "All"
    ) {
      return "";
    }
    return parseFloat(value).toFixed(2) + unit;
  };
  console.log(graph);
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
        <Grid xs={12} item container>
          <Grid xs={12} item container>
            {graph.info !== "Level" ? (
              <>
                <Grid xs={6} item container>
                  <AverageValueTitle>Average</AverageValueTitle>
                </Grid>
                <Grid xs={6} item container>
                  <AverageValueInfo>
                    {roundToTwoDecimals(graph.avg)}
                  </AverageValueInfo>
                </Grid>
              </>
            ) : (
              <>
                <Grid xs={12} item container>
                  <Grid xs={6} item container>
                    <AverageValueTitle>Average Level 1</AverageValueTitle>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueTitle>Average Level 2</AverageValueTitle>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueInfo>
                      {roundToTwoDecimals(graph.avg.Level1)}
                    </AverageValueInfo>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueInfo>
                      {roundToTwoDecimals(graph.avg.Level2)}
                    </AverageValueInfo>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>

          <Grid xs={12} item container>
            {graph.info !== "Level" ? (
              <>
                <Grid xs={6} item container>
                  <AverageValueTitle>Max Value</AverageValueTitle>
                </Grid>
                <Grid xs={6} item container>
                  <AverageValueInfo>
                    {roundToTwoDecimals(graph.max)}
                  </AverageValueInfo>
                </Grid>
              </>
            ) : (
              <>
                <Grid xs={12} item container>
                  <Grid xs={6} item container>
                    <AverageValueTitle>Max Level 1</AverageValueTitle>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueTitle>Max Level 2</AverageValueTitle>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueInfo>
                      {roundToTwoDecimals(graph.max.Level1)}
                    </AverageValueInfo>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueInfo>
                      {roundToTwoDecimals(graph.max.Level2)}
                    </AverageValueInfo>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>

          <Grid xs={12} item container>
            {graph.info !== "Level" ? (
              <>
                <Grid xs={6} item container>
                  <AverageValueTitle>Min Value</AverageValueTitle>
                </Grid>
                <Grid xs={6} item container>
                  <AverageValueInfo>
                    {roundToTwoDecimals(graph.min)}
                  </AverageValueInfo>
                </Grid>
              </>
            ) : (
              <>
                <Grid xs={12} item container>
                  <Grid xs={6} item container>
                    <AverageValueTitle>Min Level 1</AverageValueTitle>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueTitle>Min Level 2</AverageValueTitle>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueInfo>
                      {roundToTwoDecimals(graph.min.Level1)}
                    </AverageValueInfo>
                  </Grid>
                  <Grid xs={6} item container>
                    <AverageValueInfo>
                      {roundToTwoDecimals(graph.min.Level2)}
                    </AverageValueInfo>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>{" "}
    </>
  );
};
