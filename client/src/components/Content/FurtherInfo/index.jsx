import { Grid, Input, TextField } from "@mui/material";
import { AverageValueTitle, TimeButton } from "../../style/style";

export const FurtherInfo = (props) => {
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
          <AverageValueTitle>Average</AverageValueTitle>
          <AverageValueTitle>Max Value</AverageValueTitle>
          <AverageValueTitle>Min Value</AverageValueTitle>
        </Grid>
      </Grid>{" "}
    </>
  );
};
