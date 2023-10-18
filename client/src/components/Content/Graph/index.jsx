import { Grid } from "@mui/material";
import { GraphButton, SelectedButton } from "../../style/style";

export const GraphType = (props) => {
  const graph = props.graph;
  const setGraph = props.setGraph;
  const type = ["Line", "Bar"];

  return (
    <>
      <Grid xs={12} rowSpaing={1} columnSpacing={1} item container>
        {type.map((types) => {
          return (
            <Grid xs={3} item container marginBottom="2rem">
              {graph.type === types ? (
                <SelectedButton
                  onClick={() =>
                    setGraph({
                      ...graph, // Spread the current state
                      type: "", // Update the 'info' property
                    })
                  }
                >
                  {types} Graph
                </SelectedButton>
              ) : (
                <GraphButton
                  onClick={() =>
                    setGraph({
                      ...graph, // Spread the current state
                      type: types, // Update the 'info' property
                    })
                  }
                >
                  {types} Graph
                </GraphButton>
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
