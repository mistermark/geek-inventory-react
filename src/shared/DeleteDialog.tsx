import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type DeleteDialogProps = {
    dialogOpen: boolean,
    handleDialog: Function,
    deleteItem: {name: string | undefined, itemId: string | undefined}
}

export const DeleteDialog = ({dialogOpen, handleDialog, deleteItem}: DeleteDialogProps) => {
  return (
    <Dialog
      id="delete-dialog"
      open={dialogOpen}
      onClose={() => handleDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete <span className="font-bold italic">{deleteItem.name}</span>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleDialog(false)} variant="outlined">
          No
        </Button>
        <Button
          onClick={() => handleDialog(false, deleteItem.itemId)}
          variant="contained"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
