import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { FormInputText } from './FormInputText';

type EditDialogProps = {
  dialogOpen: boolean;
  handleDialog: Function;
  editItem: any;
  children: React.ReactElement,
  handleSubmit?: any
};

export const EditDialog = ({
  dialogOpen,
  handleDialog,
  editItem,
  children,
  handleSubmit
}: EditDialogProps) => {
  return (
    <>
      <Dialog
        open={dialogOpen}
        onClose={() => handleDialog(false)}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle>Update {editItem.name}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
      </Dialog>
    </>
  );
};
