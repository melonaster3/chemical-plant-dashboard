import { Grid } from "@mui/material";
import { AverageValueInfo, SelectedTypeButton } from "../../style/style";
import * as XLSX from "xlsx";

export const CSVExport = (props) => {
  const graph = props.graph;

  // Define a function to export data to Excel based on the 'type' argument
  const exportToExcel = (type) => {
    if (type === "all") {
      // Export all data to Excel
      const ws = XLSX.utils.json_to_sheet(props.fullData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(
        wb,
        `${graph.timeFrame}-${graph.timeStart}-${graph.timeEnd}.xlsx`
      );
    } else if (type === "graph") {
      // Export graph-specific data to Excel
      const editedData = props.data.map((data) => {
        return {
          Date_Range: data.label,
          Temperature: data.temperature,
          Pressure: data.pressure,
          Chemical_1_Level: data.level1_chemical,
          Chemical_2_Level: data.level2_chemical,
        };
      });

      const ws = XLSX.utils.json_to_sheet(editedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(
        wb,
        `${graph.timeFrame}-${graph.timeStart}-${graph.timeEnd}.xlsx`
      );
    }
  };

  return (
    <>
      <Grid
        xs={12}
        rowSpaing={1}
        marginBottom="2rem"
        columnSpacing={1}
        s
        item
        container
      >
        <Grid xs={12} item container>
          <AverageValueInfo>Excel Data</AverageValueInfo>{" "}
          {/* // Display a label for the Excel data*/}
        </Grid>
        <Grid xs={4} item container>
          <SelectedTypeButton onClick={() => exportToExcel("graph")}>
            Graph Data {/* // Button to export graph-specific data to Excel */}
          </SelectedTypeButton>
        </Grid>
        <Grid xs={4} item container>
          <SelectedTypeButton onClick={() => exportToExcel("all")}>
            Full Data {/* // Button to export all data to Excel */}
          </SelectedTypeButton>
        </Grid>
      </Grid>
    </>
  );
};
