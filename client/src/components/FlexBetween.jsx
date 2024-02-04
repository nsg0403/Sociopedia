import { Box } from "@mui/material";
import { styled } from "@mui/system";
//re-using css as component
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;
