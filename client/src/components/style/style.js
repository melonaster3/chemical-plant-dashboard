import { Button, Grid, Input, styled } from "@mui/material";


export const TemperatureButton = styled(Button)`
background-color : #99557B;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const SelectedButton = styled(Button)`
background-color : #b4586d;
font-weight : bold;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;


export const PressureButton = styled(Button)`
background-color : #785580;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const TypeButton = styled(Button)`

border: 1px solid  #57537A;
color :  #57537A;
background-color : transparent;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const SelectedTypeButton = styled(Button)`
background-color : #57537A;
font-weight : bold;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const GraphButton = styled(Button)`
border: 1px solid #b4586d; 
background-color : transparent;
color : #b4586d; 
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const TimeButton = styled(Button)`
border: 1px solid #2B8944;
background-color : transparent;
color :#2B8944;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const SelectedTimeButton = styled(Button)`
background-color : #2B8944;
font-weight : bold;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const FetchButton = styled(Button)`
background-color : #9A6F27;

&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const AllButton = styled(Button)`
background-color : #3D4F6B;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;
export const ResetButton = styled(Button)`
background-color : #2F4858;
&:hover {
    background-color: rgba(0, 0, 255, 0.2); 
  }
`;

export const GraphDiv = styled ("div")`
margin-right : 2vw;
width : 70vw;
height : 100%; 
`
export const TableContentDiv = styled ("div")`
margin-top : 10vw;
width : 25vw;
height : 100%; 
`
export const AverageValueTitle = styled ("p")`
color: rgba(192, 192, 192, 0.9);
`
export const AverageValueInfo = styled ("p")`
color: rgba(192, 192, 192, 0.9);

`