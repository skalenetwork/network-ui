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

import detectEthereumProvider from '@metamask/detect-provider';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import MetamaskConnector from './MetamaskConnector';
import logo from '../skale-logo.svg';

const SkAppBar = styled(AppBar)({
    'background-color': 'rgb(22, 23, 29)',
    padding: '15px 0',
});

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.checkWeb3Connection=this.checkWeb3Connection.bind(this);
  }

  componentDidMount() {
    var intervalId = setInterval(this.checkWeb3Connection, 2000);
    this.setState({intervalId: intervalId});
  }
 
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
 
 async checkWeb3Connection() {
    const provider = await detectEthereumProvider();
    if (provider && !this.props.connected) {
      this.props.setConnected(true);
      this.props.setProvider(provider);
    }
  }

  render() {
    return (
      <SkAppBar position="fixed" className="sk-header">
        <Toolbar>
            <MetamaskConnector/>
            <div className='grow'>
                <img src={logo} className="logo" alt="logo" />
            </div>
        </Toolbar>
    </SkAppBar>
    )
  }
}