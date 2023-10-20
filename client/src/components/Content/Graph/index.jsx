import { Grid } from "@mui/material";
import { GraphButton, SelectedButton } from "../../style/style";

export const GraphType = (props) => {
  const graph = props.graph;
  const setGraph = props.setGraph;

  const type = ["Line", "Bar"];

  return (
    <>
      <Grid xs={12} rowSpacing={1} columnSpacing={1} item container>
        {/* Mapping over the 'type' array to create buttons for each graph type. */}
        {type.map((types, index) => {
          return (
            <Grid key={index} xs={3} item container marginBottom="2rem">
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
