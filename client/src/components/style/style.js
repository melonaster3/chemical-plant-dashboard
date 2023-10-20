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
export const LastButton = styled(Button)`
color : #6db458 ;
border: 1px solid #6db458 ;
background-color : transparent;
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
@media (max-width: 1400px) {
  width: 100vw;
  display : flex;
  flex-direction : row;
  justify-content : center;
}
`
export const TableContentDiv = styled ("div")`
margin-top : 3vw;
width : 25vw;
height : 100%; 
@media (min-width:870px) and (max-width: 1400px) {
  width: 40vw;
}
@media (min-width:579px) and (max-width: 870px) {
  width: 60vw;
}
@media (min-width:0px) and (max-width: 579px) {
  width: 90vw;
}
`
export const AverageValueTitle = styled ("p")`
color: rgba(192, 192, 192, 0.9);
font-size : 1.2rem;

`
export const AverageValueInfo = styled ("p")`
color: rgba(192, 192, 192, 0.9);


`
export const TimeInfo = styled ("p")`
color: rgba(192, 192, 192, 0.9);
font-size : 1.2rem;
`
export const MaxMin = styled ("p")`
color: rgba(192, 192, 192, 0.9);
font-size : 1rem;

`