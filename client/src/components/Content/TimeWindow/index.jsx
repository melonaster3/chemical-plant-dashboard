import { Grid, Input, TextField } from "@mui/material";
import { TimeButton } from "../../style/style";

export const TimeWindow = (props) => {
  const graph = props.graph;
  const setGraph = props.setGraph;
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
          <Input
            fullWidth
            onChange={(e) => {
              setGraph({
                ...graph, // Spread the current state
                timeStart: e.target.value, // Update the 'info' property
              });
            }}
            id="StartTime"
            type="datetime-local"
            inputProps={{
              style: {
                color: "rgba(192, 192, 192, 0.9)",
                borderColor: "white",
              }, // Set the font color to white

              max: graph.timeEnd ? graph.timeEnd : "",
            }}
          ></Input>
        </Grid>
        <Grid xs={6} item container>
          <Input
            fullWidth
            onChange={(e) => {
              setGraph({
                ...graph, // Spread the current state
                timeEnd: e.target.value, // Update the 'info' property
              });
            }}
            id="EndTime"
            type="datetime-local"
            inputProps={{
              style: {
                color: "rgba(192, 192, 192, 0.9)",
                borderColor: "rgba(192, 192, 192, 0.9)",
              }, // Set the font color to white

              min: graph.timeStart ? graph.timeStart : "", // Replace with your desired minimum date and time
            }}
          ></Input>
        </Grid>
      </Grid>{" "}
    </>
  );
};
