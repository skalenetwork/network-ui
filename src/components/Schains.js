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

// import Web3 from 'web3';
// import Skale from '@skalenetwork/skale.js-test';

import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

import Button from '@mui/material/Button';
import LanguageIcon from '@mui/icons-material/Language';

import SchainsAccordion from './SchainsAccordion';
import metamaskLogo from '../metamask-fox.svg';

import chainsJson from './chains.json'

export const CHAIN_ID = process.env["REACT_APP_CHAIN_ID"];
export const NETWORK_NAME = process.env["REACT_APP_NETWORK_NAME"];

function hashCode(str) {
  let hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function stringToColour(str) {
  return `hsl(${hashCode(str) % 360}, 100%, 80%)`;
}

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
    this.loadSchainsFile=this.loadSchainsFile.bind(this);
    this.updateTime=this.updateTime.bind(this);
    this.wrongNetwork=this.wrongNetwork.bind(this);
  }

  componentDidMount() {
    this.loadSchains();
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

  wrongNetwork() {
    return window.ethereum.chainId !== CHAIN_ID;
  }

  async loadSchainsFile() {
    // let response = await fetch('/files/chains.json');
    // let chainsJson = await response.json();
    let schainNames = [];
    for (let chain of chainsJson) {
      schainNames.push(chain.schain[0]);
    }
    return schainNames;
  }
 
  async loadSchains() {
    // if (!this.props.provider) return;
    // if (this.wrongNetwork()) {
    //   this.setState({wrongNetwork: true})
    //   return;
    // }
    // if (!this.state.skale) {
    //   this.setState({skale: new Skale(new Web3(this.props.provider), smAbi)});
    // }
    // await this.switchNetwork();
    // await changeMetamaskNetwork();

    // let chains = await this.state.skale.contracts.schainsInternal.getSchainsNames();
    let schainNames = await this.loadSchainsFile();
    this.setState({
      loading: false,
      schains: schainNames,
      updatedAt: new Date().getTime()
    });
    this.updateTime();
  }

  render() {
    const { loading, timeDiff, schains, wrongNetwork } = this.state;

    if (wrongNetwork) {
      return (
        <div className="fullscreen-msg">
          <div className="fl-container ">
            <div className='fl-container fl-centered'>
              <img src={metamaskLogo} alt="logo" className='marg-bott-40 metamaskLogo'/>
            </div>
            <div className='fl-container fl-centered'>
              <Button
                variant="contained"
                startIcon={<LanguageIcon/>}
                size="large"
                className='MetamaskSurface'
                onClick={changeMetamaskNetwork}
              >
                Switch network to load SKALE Chains
              </Button>
            </div>
          </div>
        </div>
      );
    };

    if (loading) {
      return (
        <div className="fullscreen-msg">
          <div>
            <div className="flex-container">
              <div className="flex-container fl-centered">
                <CircularProgress className='fullscreen-spin' />
              </div>  
              <div className="flex-container fl-centered">
                <h3 className='fullscreen-msg-text'>
                  Loading SKALE Chains
                  {/* {this.props.connected ? 'Loading SKALE Chains' : 'Connecting to the network' }  */}
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
              <Chip
                sx={{
                  color: '#000000',
                  'background-color': stringToColour(NETWORK_NAME)
                }}
                label={NETWORK_NAME}
                className="marg-bott-10"
                size="small"
              />
            </div>
            <div className="flex-container fl-centered marg-left-10">
              <Chip label={updatedText} className="marg-bott-10" size="small"/>
            </div>
          </div>
          <h1 className='card-header'>
            {schains.length} SKALE Chains
          </h1>
          <h5 className="text-secondary">
            Select any chain to get endpoints
          </h5>
        </div>
        <SchainsAccordion connected={this.props.connected} schains={schains}/>
      </div>
    )
  }
}
