import { Grid } from "@mui/material";
import { GraphButton, SelectedButton } from "../../style/style";

export const GraphType = (props) => {
  // Extract 'graph' and 'setGraph' from the 'props' object.
  const graph = props.graph;
  const setGraph = props.setGraph;

  // An array 'type' containing two graph types: Line and Bar.
  const type = ["Line", "Bar"];

  return (
    <>
      {/* A grid container with 12 columns and 1 unit of spacing between rows and columns. */}
      <Grid xs={12} rowSpacing={1} columnSpacing={1} item container>
        {/* Mapping over the 'type' array to create buttons for each graph type. */}
        {type.map((types) => {
          return (
            // A grid container with 3 columns, and some margin at the bottom.
            <Grid xs={3} item container marginBottom="2rem">
              {/* Conditional rendering based on whether 'graph.type' matches the current type. */}
              {graph.type === types ? (
                // SelectedButton component for the currently selected type.
                <SelectedButton
                  onClick={() =>
                    setGraph({
                      ...graph,
                      type: "",
                    })
                  }
                >
                  {types} Graph
                </SelectedButton>
              ) : (
                // GraphButton component for unselected types.
                <GraphButton
                  onClick={() =>
                    setGraph({
                      ...graph,
                      type: types,
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
