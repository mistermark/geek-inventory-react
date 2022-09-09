import { IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import Icon from '../../shared/Icon';

type ItemDetailsHeaderMenuProps = {
  // handleEditDialog: Function;
  handleDeleteDialog: Function;
};

export const ItemDetailsHeaderMenu = ({
  // handleEditDialog,
  handleDeleteDialog,
}: ItemDetailsHeaderMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // const handleEdit = () => {
  //   handleEditDialog(true)
  //   setAnchorEl(null);
  // }
  const handleDelete = () => {
    handleDeleteDialog(true)
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon icon="BiDotsVertical" className="w-8 h-8 text-gray-500"></Icon>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {/* <MenuItem onClick={handleEdit} disableRipple>
          <Icon icon="BiEdit" className="mr-2" />
          Edit
        </MenuItem> */}
        <MenuItem onClick={handleDelete} disableRipple>
          <Icon icon="BiTrash" className="mr-2" />
          Remove
        </MenuItem>
      </Menu>
    </>
  );
};
