import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonJs from "./Button";
import FormProviderJs from "./FormProvider";
import CircularProgress from "@mui/material/CircularProgress";

function DialogJs({
  maxWidth,
  open,
  onSubmit,
  onClose,
  title,
  children,
  fullScreen,
  fullWidth,
  footerAction,
  closeButton,
  closeText,
  submitButton,
  submitText,
  methos,
  dialogSubmit,
  loading,
  color = "default",
  onClickSubmit,
}) {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: "rgba(0, 0, 0, 0.24) -40px 40px 80px -8px",
        },
      }}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
    >
      {dialogSubmit ? (
        <FormProviderJs handleSubmit={onSubmit} method="POST" methods={methos}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          {footerAction && (
            <DialogActions>
              {closeButton && (
                <ButtonJs
                  variant="outlined"
                  title={closeText}
                  color="default"
                  onClick={onClose}
                  type="button"
                />
              )}
              {submitButton && (
                <ButtonJs
                  title={submitText}
                  color="default"
                  type="submit"
                  disabled={loading}
                  icon={
                    <CircularProgress
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                  }
                  leftIcon={loading}
                />
              )}
            </DialogActions>
          )}
        </FormProviderJs>
      ) : (
        <>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          {footerAction && (
            <DialogActions>
              {closeButton && (
                <ButtonJs
                  variant="outlined"
                  title={closeText}
                  color="default"
                  onClick={onClose}
                  type="button"
                />
              )}
              {submitButton && (
                <ButtonJs
                  title={submitText}
                  color={color}
                  type="button"
                  disabled={loading}
                  onClick={onClickSubmit}
                  icon={
                    <CircularProgress
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "white",
                      }}
                    />
                  }
                  leftIcon={loading}
                />
              )}
            </DialogActions>
          )}
        </>
      )}
    </Dialog>
  );
}

export default DialogJs;
