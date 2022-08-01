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
 * @file Header.js
 * @copyright SKALE Labs 2021-Present
*/

import React from 'react';
import styled from '@emotion/styled'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Link } from "react-router-dom";
import logo from '../skale-logo.svg';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

const SkAppBar = styled(AppBar)({
    // 'background-color': 'rgb(22, 23, 29)',
    'backgroundColor': '#141414',
    padding: '15pt 0',
    'boxShadow': 'none',
    'backgroundImage': 'none'
});

export const MAIN_WEBSITE_URL = process.env["REACT_APP_MAIN_WEBSITE_URL"];
export const DOCS_WEBSITE_URL = process.env["REACT_APP_DOCS_WEBSITE_URL"];
export const ABIS_URL = process.env["REACT_APP_ABIS_URL"];
export const NETWORK_NAME = process.env["REACT_APP_NETWORK_NAME"];


export default class Header extends React.Component {
  render() {
    return (
      <SkAppBar position="fixed" className="sk-header">
        <Toolbar className='flex-container'>
            <div className="flex-container fl-centered-vert fl-grow">
              <Link to="/">
                <img src={logo} className="logo" alt="logo" />
              </Link>
            </div>
            <div className="flex-container marg-ri-20">
              <a target="_blank" rel="noreferrer" href={DOCS_WEBSITE_URL} className='undec skdLink'>
              <Button
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                color="primary"
                startIcon={<MenuBookIcon/>}
                className='skBtn'
              > 
                Docs
              </Button>
              </a>
            </div>
            <div className="flex-container">
              <a target="_blank" rel="noreferrer" href={ABIS_URL} className='undec skdLink'>
              <Button
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                color="primary"
                startIcon={<BuildCircleIcon/>}
                className='skBtn'
              > 
                ABIs
              </Button>
              </a>
            </div>
        </Toolbar>
    </SkAppBar>
    )
  }
}