import React, { useState } from 'react';
import { AppBar, Avatar, Box, Container, Divider, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import LoginButton from './auth/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';

import SignUpButton from './auth/SignUpButton';
import Icon from '../shared/Icon';

const navigation = [
  { name: 'Dashboard', path: '/', current: true },
  { name: 'Collections', path: '/collections', current: false },
];

/**
 * @param {string[]} classes
 * @return {string}
 */
function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 *
 * @return {React.ReactElement}
 */
function Navigation(): React.ReactElement {
  const { user, isAuthenticated, logout } = useAuth0();
  const roles = (user ? user['https://scrubjay.io/roles'] : []);

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuProfileOpen = Boolean(menuAnchorEl);
  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  }
  const handleProfileMenuClose = () => {
    setMenuAnchorEl(null);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
          <Toolbar>
            <NavLink to="/">
              <Icon icon="BiHome" className='w-8 h-8 mr-5' />
            </NavLink>
            {isAuthenticated && navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({isActive}) => (
                  classNames(
                    isActive
                      ? 'bg-gray-900'
                      : 'hover:bg-gray-50 hover:text-gray-900',
                    'px-3 py-2 rounded-md text-white font-medium'
                  )
                )}
              >
                {item.name}
              </NavLink>
            ))}
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end" }}>
              <div className="ml-4 flex items-center md:ml-6">
              { roles.includes('Geek Admin') && isAuthenticated ? 
                <NavLink
                    to='/admin'
                    className={({isActive}) => (
                      classNames(
                        isActive
                          ? 'bg-gray-900'
                          : 'hover:bg-gray-50 hover:text-gray-900',
                        'px-3 py-2 rounded-md text-white font-medium'
                      )
                    )}
                  >
                    Admin*
                  </NavLink>
                : null}
                {isAuthenticated ? 
                <>
                  <IconButton
                    onClick={handleProfileMenuClick}
                  >
                    <Avatar 
                      sx={{width: 42, height: 42}}
                      src={user?.picture}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={menuProfileOpen}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    onClose={handleProfileMenuClose}
                    onClick={handleProfileMenuClose}
                    PaperProps={{
                      className: 'w-36'
                    }}
                  >
                    <MenuItem>
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
                : <>
                  <LoginButton />
                  <SignUpButton />
                </> } 
              </div>
            </Box>
          </Toolbar>
      </Container>
    </AppBar>
  )

}

export default Navigation;
