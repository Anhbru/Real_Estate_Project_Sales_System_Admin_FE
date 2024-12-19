export const configTokenJson = {
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
};
export const configTokenFormData = {
  headers: {
    "content-type": "multipart/form-data",
    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  },
};

export const TYPE_COLOR_BUTTON = {
  DEFAULT: "default",
  INFO: "info",
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error",
  SECONDARY: "secondary",
  PRIMARY: "primary",
};

// background color
export const BUTTON_COLOR = {
  DEFAULT: "rgb(33, 43, 54)",
  PRIMARY: "rgb(0, 167, 111)",
  SECONDARY: "rgb(142, 51, 255)",
  INFO: "rgb(0, 184, 217)",
  SUCCESS: "rgb(34, 197, 94)",
  WARNING: "rgb(255, 171, 0)",
  ERROR: "rgb(255, 86, 48)",
};

export const BUTTON_HOVER_COLOR = {
  DEFAULT: "rgb(69, 79, 91)",
  PRIMARY: "rgb(0, 120, 103)",
  SECONDARY: "rgb(81, 25, 183)",
  INFO: "rgb(0, 108, 156)",
  SUCCESS: "rgb(17, 141, 87)",
  WARNING: "rgb(183, 110, 0)",
  ERROR: "rgb(183, 29, 24)",
};

export const BUTTON_HOVER_COLOR_OUTLINED = {
  DEFAULT: "rgba(33, 43, 54, 0.08)",
  PRIMARY: "rgba(0, 167, 111, 0.08)",
  SECONDARY: "rgba(142, 51, 255, 0.08)",
  INFO: "rgba(0, 184, 217, 0.08)",
  SUCCESS: "rgba(34, 197, 94, 0.08)",
  WARNING: "rgba(255, 171, 0, 0.08)",
  ERROR: "rgba(255, 86, 48, 0.08)",
};

export const BUTTON_HOVER_BOX_SHADOW_COLOR = {
  DEFAULT: "none",
  PRIMARY: "rgba(0, 167, 111, 0.24) 0px 8px 16px 0px",
  SECONDARY: "rgba(142, 51, 255, 0.24) 0px 8px 16px 0px",
  INFO: "rgba(0, 184, 217, 0.24) 0px 8px 16px 0px",
  SUCCESS: "rgba(34, 197, 94, 0.24) 0px 8px 16px 0px",
  WARNING: "rgba(255, 171, 0, 0.24) 0px 8px 16px 0px",
  ERROR: "rgba(255, 86, 48, 0.24) 0px 8px 16px 0px",
};

// text color
export const BUTTON_TEXT_COLOR = {
  DEFAULT: "inherit",
  PRIMARY: "rgb(0, 167, 111)",
  SECONDARY: "rgb(142, 51, 255)",
  INFO: "rgb(0, 184, 217)",
  SUCCESS: "rgb(34, 197, 94)",
  WARNING: "rgb(255, 171, 0)",
  ERROR: "rgb(255, 86, 48)",
};

// border color
export const BUTTON_BORDER_COLOR = {
  DEFAULT: "1px solid",
  PRIMARY: "1px solid rgba(0, 167, 111, 0.5)",
  SECONDARY: "1px solid rgba(142, 51, 255, 0.5)",
  INFO: "1px solid rgba(0, 184, 217, 0.5)",
  SUCCESS: "1px solid rgba(34, 197, 94, 0.5)",
  WARNING: "1px solid rgba(255, 171, 0, 0.5)",
  ERROR: "1px solid rgba(255, 86, 48, 0.5)",
};

export const ALERT_BG_COLOR = {
  // color alert filled
  ALERT_COLOR_FILLED: {
    INFO: "rgb(0, 184, 217)",
    SUCCESS: "rgb(34, 197, 94)",
    WARNING: "rgb(255, 171, 0)",
    ERROR: "rgb(255, 86, 48)",
  },

  // color alert standard
  ALERT_COLOR_STANDARD: {
    INFO: "rgb(202, 253, 245)",
    SUCCESS: "rgb(211, 252, 210)",
    WARNING: "rgb(255, 245, 204)",
    ERROR: "rgb(255, 233, 213)",
  },

  // color alert outlined
  ALERT_COLOR_OUTLINED: {
    INFO: "rgba(0, 184, 217, 0.08)",
    SUCCESS: "rgba(34, 197, 94, 0.08)",
    WARNING: "rgba(255, 171, 0, 0.08)",
    ERROR: "rgba(255, 86, 48, 0.08)",
  },

  // color alert description
  ALERT_COLOR_DESCRIPTION: {
    INFO: "rgb(202, 253, 245)",
    SUCCESS: "rgb(211, 252, 210)",
    WARNING: "rgb(255, 245, 204)",
    ERROR: "rgb(255, 233, 213)",
  },
};

// border color alert
export const BORDER_ALERT = {
  INFO: "1px solid rgba(0, 184, 217, 0.16)",
  SUCCESS: "1px solid rgba(34, 197, 94, 0.16)",
  WARNING: "1px solid rgba(255, 171, 0, 0.16)",
  ERROR: "1px solid rgba(255, 86, 48, 0.16)",
};

// text color alert
export const TEXT_COLOR_ALERT = {
  INFO: "rgb(0, 55, 104)",
  SUCCESS: "rgb(6, 94, 73)",
  WARNING: "rgb(122, 65, 0)",
  ERROR: "rgb(122, 9, 22)",
};

export const ROLE_ADMIN = "Admin";
export const ROLE_STAFF = "Staff";
