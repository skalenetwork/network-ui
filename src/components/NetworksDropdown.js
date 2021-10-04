/**
 * @license
 * SKALE proxy-ui
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file NetworksDropdown.js
 * @copyright SKALE Labs 2021-Present
*/

import React from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

const NETWORK_NAME = process.env["REACT_APP_NETWORK_NAME"];
const NETWORKS = JSON.parse(process.env["REACT_APP_NETWORKS"]);

export default function LongMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    props.setCurrentSchain(index);
    setAnchorEl(null);
  };

  return (
    <div className='marg-left-10'>
      <Button
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
        startIcon={<SyncAltIcon/>}
        className='skBtn'
      > 
        Change network
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {Object.entries(NETWORKS).map((option) => (
          <MenuItem
            key={option[0]} selected={option[0] === NETWORK_NAME}>
            <a href={option[1]} className='undec'>
              {option[0]}
            </a>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
