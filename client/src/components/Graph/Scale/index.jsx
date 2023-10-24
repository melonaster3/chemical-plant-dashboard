import { Grid, Input } from "@mui/material";
import { MaxMin } from "../../style/style";

export function ScaleContent(props) {
  const graph = props.graph;
  const setGraph = props.setGraph;
  return (
    <>
      <Grid fullWidth justifyContent="flex-end" container>
        <Grid xs={4} justifyContent="flex-end" item container>
          <Grid xs={12} item container columnSpacing={2}>
            <Grid xs={9} justifyContent={"flex-end"} item container>
              <MaxMin>Y Axis Max Value</MaxMin>
            </Grid>
            <Grid xs={3} item container>
              <Input
                fullWidth
                onChange={(e) => {
                  setGraph({
                    ...graph, // Spread the current state
                    yMax: e.target.value, // Update the 'info' property
                  });
                }}
                id="StartTime"
                type="number"
                step={0.01}
                defaultValue={graph.yMax}
                value={graph.yMax}
                inputProps={{
                  style: {
                    color: "rgba(192, 192, 192, 0.9)",
                    borderColor: "white",
                  }, // Set the font color to white
                }}
              />
            </Grid>
          </Grid>
          <Grid xs={12} item container columnSpacing={2}>
            <Grid xs={9} justifyContent={"flex-end"} item container>
              <MaxMin>Y Axis Min Value</MaxMin>
            </Grid>
            <Grid xs={3} item container>
              <Input
                fullWidth
                onChange={(e) => {
                  setGraph({
                    ...graph, // Spread the current state
                    yMin: e.target.value, // Update the 'info' property
                  });
                }}
                id="StartTime"
                type="number"
                step={0.01}
                defaultValue={graph.yMin}
                value={graph.yMin}
                inputProps={{
                  style: {
                    color: "rgba(192, 192, 192, 0.9)",
                    borderColor: "white",
                  }, // Set the font color to white
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
