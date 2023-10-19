import { Grid, Input, TextField } from "@mui/material";
import { LastButton, TimeButton, TimeInfo } from "../../style/style";
import {
  GetTimeOneDayBefore,
  GetTimeOneHourBefore,
  GetTimeOneMonthBefore,
  GetTimeOneWeekBefore,
  GetTimeRightNow,
} from "../../../services/Time/time";
export const TimeWindow = (props) => {
  const graph = props.graph;
  const setGraph = props.setGraph;

  const timeRightNow = GetTimeRightNow();

  const onClickGraph = (type) => {
    const timeNow = GetTimeRightNow();
    if (type === "Hour") {
      setGraph({
        ...graph,
        timeEnd: timeNow,
        timeStart: GetTimeOneHourBefore(timeNow),
      });
    } else if (type === "Day") {
      setGraph({
        ...graph,
        timeEnd: timeNow,
        timeStart: GetTimeOneDayBefore(timeNow),
      });
    } else if (type === "Week") {
      setGraph({
        ...graph,
        timeEnd: timeNow,
        timeStart: GetTimeOneWeekBefore(timeNow),
      });
    } else if (type === "Month") {
      setGraph({
        ...graph,
        timeEnd: timeNow,
        timeStart: GetTimeOneMonthBefore(timeNow),
      });
    }
  };

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
          <TimeInfo>Start Time</TimeInfo>
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
            defaultValue={graph.timeStart}
            value={graph.timeStart}
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
          <TimeInfo>End Time</TimeInfo>

          <Input
            fullWidth
            defaultValue={timeRightNow}
            value={graph.timeEnd}
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
        <Grid marginTop={"2rem"} xs={12} item container>
          <Grid xs={3} item container>
            <LastButton onClick={() => onClickGraph("Hour")}>
              Last Hour
            </LastButton>
          </Grid>
          <Grid xs={3} item container>
            <LastButton onClick={() => onClickGraph("Day")}>
              Last Day
            </LastButton>
          </Grid>
          <Grid xs={3} item container>
            <LastButton onClick={() => onClickGraph("Week")}>
              Last Week
            </LastButton>
          </Grid>
          <Grid xs={3} item container>
            <LastButton onClick={() => onClickGraph("Month")}>
              Last Month
            </LastButton>
          </Grid>
        </Grid>
      </Grid>{" "}
    </>
  );
};
