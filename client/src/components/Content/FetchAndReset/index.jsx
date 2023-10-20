import { Grid } from "@mui/material";
import { FetchButton } from "../../style/style";
import { GetTimeRightNow } from "../../../services/Time/time";

export const FetchAndReset = (props) => {
  const handleButtonClick = props.buttonClick;
  const graph = props.graph;
  const timeRightNow = GetTimeRightNow();
  const setGraph = props.setGraph;

  return (
    <>
      <Grid
        xs={12}
        rowSpacing={1}
        columnSpacing={1}
        item
        container
        display="flex"
        marginBottom="2rem"
      >
        <Grid xs={3} item container>
          {/* Button will fetch current new data */}
          <FetchButton onClick={handleButtonClick}>Fetch Data</FetchButton>
        </Grid>
        <Grid xs={3} item container>
          <FetchButton
            //Button will reset all options
            onClick={() =>
              setGraph({
                ...graph,
                type: "",
                info: "",
                timeFrame: "",
                timeStart: "",
                timeEnd: timeRightNow,
                avg: "",
                max: "",
                min: "",
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
