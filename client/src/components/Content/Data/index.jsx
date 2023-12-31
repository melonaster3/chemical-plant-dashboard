import { Grid } from "@mui/material";
import { SelectedTypeButton, TypeButton } from "../../style/style";

export const DataType = (props) => {
  const graph = props.graph;
  const setGraph = props.setGraph;
  const type = ["Temperature", "Pressure", "Level", "All"];
  return (
    <>
      <Grid
        xs={12}
        rowSpaing={1}
        marginBottom="2rem"
        columnSpacing={1}
        item
        container
      >
        {type.map((types, index) => {
          return (
            <Grid xs={3} key={index} item container>
              {graph.info === types ? (
                <SelectedTypeButton
                  onClick={() =>
                    setGraph({
                      ...graph, // Spread the current state
                      info: "", // Update the 'info' property
                    })
                  }
                >
                  {types}
                </SelectedTypeButton>
              ) : (
                <TypeButton
                  onClick={() =>
                    setGraph({
                      ...graph, // Spread the current state
                      info: types, // Update the 'info' property
                    })
                  }
                >
                  {types}
                </TypeButton>
              )}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
