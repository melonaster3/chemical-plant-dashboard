import { Grid } from "@mui/material";
import {
  SelectedButton,
  SelectedTimeButton,
  TimeButton,
} from "../../style/style";

export const TimeAvg = (props) => {
  const graph = props.graph;
  const setGraph = props.setGraph;
  const type = ["Hourly", "Daily", "Weekly", "Monthly"];

  return (
    <>
      <Grid xs={12} rowSpaing={1} columnSpacing={1} item container>
        {type.map((types) => {
          return (
            <Grid xs={3} item container marginBottom="2rem">
              {graph.timeFrame === types ? (
                <SelectedTimeButton
                  onClick={() =>
                    setGraph({
                      ...graph, // Spread the current state
                      timeFrame: "", // Update the 'info' property
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
                      timeFrame: types, // Update the 'info' property
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
