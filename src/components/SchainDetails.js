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
 * @file SchainDetails.js
 * @copyright SKALE Labs 2021-Present
*/

import Web3 from 'web3';

import React from 'react';

import CopySurface from './CopySurface';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import LanguageIcon from '@mui/icons-material/Language';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Button from '@mui/material/Button';
import WidgetsIcon from '@mui/icons-material/Widgets';

import { rmPad0x, stringToColour } from '../helper';


const BASE_PROXY_URL = process.env["REACT_APP_BASE_PROXY_URL"];
const EXPLORER_URL = process.env["REACT_APP_EXPLORER_URL"];
const NETWORK_NAME = process.env["REACT_APP_NETWORK_NAME"];

const HTTP_PREFIX = 'http://';
const HTTPS_PREFIX = 'https://';
const WS_PREFIX = 'ws://';
const WSS_PREFIX = 'wss://';


function getRpcUrl(schainName, prefix) {
  return prefix + BASE_PROXY_URL + '/v1/' + schainName;
}

function getRpcWsUrl(schainName, prefix) {
  return prefix + BASE_PROXY_URL + '/v1/ws/' + schainName;
}

function getFsUrl(schainName, prefix) {
  return prefix + BASE_PROXY_URL + '/fs/' + schainName;
}

function getExplorerUrl(schainName) {
  return HTTPS_PREFIX + schainName + '.' + EXPLORER_URL;
}

function getSchainHash(schainName) {
  let hash = Web3.utils.soliditySha3(schainName).substring(0, 15);
  return rmPad0x(hash);
}

export default function SchainDetails(props) {
  const rpcUrl = getRpcUrl(props.schainName, HTTPS_PREFIX);
  const rpcHttpUrl = getRpcUrl(props.schainName, HTTP_PREFIX);

  const rpcWssUrl = getRpcWsUrl(props.schainName, WSS_PREFIX);
  const rpcWsUrl = getRpcWsUrl(props.schainName, WS_PREFIX);

  const fsUrl = getFsUrl(props.schainName, HTTPS_PREFIX);
  const fsHttpUrl = getFsUrl(props.schainName, HTTP_PREFIX);

  const explorerUrl = getExplorerUrl(props.schainName);
  const schainHash = getSchainHash(props.schainName);

  const [checked, setChecked] = React.useState(true);

  const networkParams = {
    chainId: schainHash,
    chainName: NETWORK_NAME + " | " + getChainName(props.schainName),
    rpcUrls: [rpcUrl],
    nativeCurrency: {
      name: "sFUEL",
      symbol: "sFUEL",
      decimals: 18
    }
  }

  function getChainName(schainName) {
    if (props.chainMeta) {
      return props.chainMeta['alias'];
    }
    return schainName;
  }

  function getBgColor(schainName) {
    if (props.chainMeta) {
      return props.chainMeta['background'];
    }
    return stringToColour(schainName);
  }


  function getIcon(schainName) {
    let iconPath = schainName + '.png';
    if (props.icons[iconPath]) {
      return <img alt='logo' src={props.icons[iconPath].default} />
    }
    return <OfflineBoltIcon className='default-chain-icon' />;
  }

  async function addNetwork() {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networkParams],
    });
  }

  return (
    <div className='schain-details'>
      <div
        className='schain-details-top flex-container fl-centered'
        style={{ backgroundColor: getBgColor(props.schainName) }}
      >
        {getIcon(props.schainName)}
      </div>
      <div className='schain-details-bott'>
        <div className='flex-container'>
          <h1 className='no-marg fl-grow'>
            {getChainName(props.schainName)}
          </h1>
          <div className='marg-left-10'>
            {EXPLORER_URL ? (
              <a target="_blank" rel="noreferrer" href={explorerUrl} className='undec'>
                <Button size="small" variant="contained website-btn chain-btn" startIcon={<WidgetsIcon />}>
                  Explorer
                </Button>
              </a>
            ) : null}
          </div>
          <div className='marg-left-10'>
            <Button
              startIcon={<AddCircleIcon />}
              size="small"
              variant="contained website-btn chain-btn"
              onClick={addNetwork}
            >
              Add network
            </Button>
          </div>
          {(props.chainMeta && props.chainMeta.url) ? <div className='marg-left-10'>
            <a target="_blank" rel="noreferrer" href={props.chainMeta.url} className='undec'>
              <Button size="small" variant="contained website-btn chain-btn" startIcon={<LanguageIcon />}>
                Open
              </Button>
            </a>
          </div> : null}

        </div>
        
        <div className="marg-top-20 flex-container fl-centered-vert">
          {/* <div className="flex-container fl-grow fl-centered-vert">
            <h4 className='no-marg secondary-text'>
              RPC Endpoints
            </h4>
          </div> */}
          {/* <div className="flex-container fl-centered-vert">
          <SecureSwitch checked={checked} setChecked={setChecked} />
        </div> */}
        </div>
        <CopySurface url={checked ? rpcUrl : rpcHttpUrl} />
        <CopySurface url={checked ? rpcWssUrl : rpcWsUrl} />

        <h4 className='no-marg-bott secondary-text'>
          Filestorage Endpoint
        </h4>
        <CopySurface url={checked ? fsUrl : fsHttpUrl} />

        <h4 className='no-marg-bott secondary-text'>
          Chain ID
        </h4>
        <CopySurface url={schainHash} />
      </div>

    </div>
  );
}
