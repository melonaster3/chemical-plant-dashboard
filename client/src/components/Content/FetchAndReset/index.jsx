import { Grid } from "@mui/material";
import { FetchButton } from "../../style/style";

export const FetchAndReset = (props) => {
  const handleButtonClick = props.buttonClick;
  const graph = props.graph;
  const setGraph = props.setGraph;
  return (
    <>
      <Grid
        xs={12}
        rowSpaing={1}
        columnSpacing={1}
        item
        container
        display="flex"
        marginBottom="2rem"
      >
        <Grid xs={3} item container>
          <FetchButton onClick={handleButtonClick}>Fetch Data</FetchButton>{" "}
        </Grid>
        <Grid xs={3} item container>
          <FetchButton
            onClick={() =>
              setGraph({
                ...graph, // Spread the current state
                type: "",
                info: "",
                timeFrame: "",
                timeStart: "",
                timeEnd: "",
              })
            }
          >
            Reset
          </FetchButton>
        </Grid>
      </Grid>
    </>
  );
};
