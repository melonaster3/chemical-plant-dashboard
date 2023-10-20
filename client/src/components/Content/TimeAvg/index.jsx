import { Grid } from "@mui/material";
import {
  AverageValueInfo,
  SelectedButton,
  SelectedTimeButton,
  TimeButton,
} from "../../style/style";

export const TimeAvg = (props) => {
  const graph = props.graph;
  const setGraph = props.setGraph;
  const type = ["Hourly", "Daily", "Weekly", "Monthly", "Reset"];

  return (
    <>
      <Grid xs={12} rowSpaing={1} columnSpacing={1} item container>
        <Grid xs={12} item container>
          <AverageValueInfo>Average</AverageValueInfo>
        </Grid>
        {type.map((types, index) => {
          return (
            <Grid key={index} xs={3} item container marginBottom="2rem">
              {graph.timeFrame === types ? (
                <SelectedTimeButton
                  onClick={() =>
                    setGraph({
                      ...graph, // Spread the current state
                      timeFrame: "", // Update the 'timeFrame' property
                    })
                  }
                >
                  {types}
                </SelectedTimeButton>
              ) : (
                <TimeButton
                  onClick={() =>
                    setGraph({
                      ...graph, // Spread the current state
                      timeFrame: types !== "Reset" ? types : "", // Update the 'timeFrame' property
                    })
                  }
                >
                  {types}
                </TimeButton>
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
