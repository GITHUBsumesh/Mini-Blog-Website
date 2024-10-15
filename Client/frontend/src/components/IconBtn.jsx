import React from "react";

import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Mui.Tooltip title={title}>
      <Mui.IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Mui.Badge badgeContent={value} color="error">
            {icon}
          </Mui.Badge>
        ) : (
          icon
        )}
      </Mui.IconButton>
    </Mui.Tooltip>
  );
};

export default IconBtn;
