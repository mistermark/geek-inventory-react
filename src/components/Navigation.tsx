import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import Icon from '../shared/Icon';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import LoginButton from './auth/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
// eslint-disable-next-line max-len
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// };
const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Collections', href: '/collections', current: false },
];
// const userNavigation = [
//   {name: 'Your Profile', href: '#'},
//   {name: 'Settings', href: '#'},
//   {name: 'Sign out', href: '#'},
// ];

/**
 * @param {string[]} classes
 * @return {string}
 */
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

/**
 *
 * @return {React.ReactElement}
 */
function Navigation(): React.ReactElement {
  const { user, isAuthenticated, logout } = useAuth0();

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const menuProfileOpen = Boolean(menuAnchorEl);
  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  }
  const handleProfileMenuClose = () => {
    setMenuAnchorEl(null);
  }
  return ( 
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                {isAuthenticated ?
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
                : null }
              </div>
              <div className='flex items-center'>
                {isAuthenticated ? 
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* <button
                      type="button"
                      className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none
                      focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}
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
                    {/* <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-
                          bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu> */}
                  </div>
                </div>
                : <LoginButton />}
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button
                  className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md
                  text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2
                  focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <Icon
                      icon={'BiX'}
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon
                      icon={'BiMenu'}
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {/* <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.imageUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-whit
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white
                      hover:bg-gray-700"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div> */}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navigation;
