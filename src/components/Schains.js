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
 * @file Schains.js
 * @copyright SKALE Labs 2021-Present
*/

import React from 'react';

import Web3 from 'web3';
import Skale from '@skalenetwork/skale.js-test';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

import SchainsAccordion from './SchainsAccordion';

import smAbi from '../abis/manager.json';

export const CHAIN_ID = process.env["REACT_APP_CHAIN_ID"];
export const NETWORK_NAME = process.env["REACT_APP_NETWORK_NAME"];

export async function changeMetamaskNetwork() {
  try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{chainId: CHAIN_ID}],
      });
    } catch (switchError) {
      return 1;
  }
  return 0;
}

export default class Schains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      updatedAt: new Date().getTime()
    };
    this.loadSchains=this.loadSchains.bind(this);
    this.updateTime=this.updateTime.bind(this);
  }

  componentDidMount() {
    var intervalId = setInterval(this.loadSchains, 10000);
    var updateTimeIntervalId = setInterval(this.updateTime, 1000);
    this.setState({
      intervalId: intervalId,
      updateTimeIntervalId: updateTimeIntervalId
    });
  }
 
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    clearInterval(this.state.updateTimeIntervalId);
  }

  updateTime() {
    this.setState({
      timeDiff: Math.floor((new Date().getTime() - this.state.updatedAt) / 1000)
    });
  }
 
  async loadSchains() {
    if (!this.props.provider) return;
    if (!this.state.skale) {
      this.setState({skale: new Skale(new Web3(this.props.provider), smAbi)});
    }
    
    await changeMetamaskNetwork();

    let chains = await this.state.skale.contracts.schainsInternal.getSchainsNames();
    this.setState({
      loading: false,
      schains: chains,
      updatedAt: new Date().getTime()
    });
  }

  render() {
    const { loading, timeDiff, schains, skale } = this.state;

    if (!this.props.connected || loading) {
      return (
        <div className="fullscreen-msg">
          <div>
            <div className="flex-container">
              <div className="flex-container fl-centered">
                <CircularProgress className='fullscreen-spin' />
              </div>  
              <div className="flex-container fl-centered">
                <h3 className='fullscreen-msg-text'>
                  {this.props.connected ? 'Loading sChains' : 'Connecting to the network' } 
                </h3>
              </div>
            </div>
          </div>
        </div>
      );
    };

    let updatedText = timeDiff < 2 ? 'Updated just now' : 'Updated ' + timeDiff + ' seconds ago';

    return (
      <div>
        <div className="marg-top-20 marg-bott-40">
          <div className="flex-container">
            <div className="flex-container fl-centered">
              <Chip label={NETWORK_NAME} color="primary" className="marg-bott-10" variant="outlined" size="small" />
            </div>
            <div className="flex-container fl-centered marg-left-10">
              <Chip label={updatedText} className="marg-bott-10" size="small"/>
            </div>
          </div>
          <h2 className='card-header'>
            {schains.length} sChains are available
          </h2>
          <Typography color="textSecondary">
            Select any chain to get endpoints
          </Typography>
        </div>
        <SchainsAccordion schains={schains} skale={skale}/>
      </div>
    )
  }
}