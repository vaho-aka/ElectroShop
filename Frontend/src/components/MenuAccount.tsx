import React, { useState } from 'react';

import { Menu, MenuItem, IconButton } from '@mui/material';

import { Link } from 'react-router-dom';
import { List } from '@phosphor-icons/react';

const paperProps = {
  elevation: 0,
  sx: {
    bgcolor: '#059669',
    overflow: 'visible',
    color: '#0f172a',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    '& li': {
      p: 0,
    },
    '& ul': {
      py: 0,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 15,
      width: 10,
      height: 10,
      bgcolor: '#059669',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

const MenuAccount = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <List color="#f3f4f6" size={32} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={paperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Link to="/sign" className="py-2 px-4 text-gray-100">
            Se connecter
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register" className="py-2 px-4 text-gray-100">
            S'inscrire
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuAccount;
