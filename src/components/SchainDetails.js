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
import LinkSurface from './LinkSurface';
import SecureSwitch from './SecureSwitch';
import MetamaskSurface from './MetamaskSurface';

import { rmPad0x } from '../helper'

export const BASE_PROXY_URL = process.env["REACT_APP_BASE_PROXY_URL"];
export const EXPLORER_URL = process.env["REACT_APP_EXPLORER_URL"];

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
  // 0x0f00fdf3fc09f
  return (
    <div className='schain-details'>
      <div className="flex-container fl-centered-vert">
        <div className="flex-container fl-grow fl-centered-vert">
          <h3 className='no-marg'>
            RPC Endpoints
          </h3>
        </div>
        <div className="flex-container fl-centered-vert">
          <SecureSwitch checked={checked} setChecked={setChecked}/>
        </div>
      </div>
      <CopySurface url={checked ? rpcUrl : rpcHttpUrl}/>
      <CopySurface url={checked ? rpcWssUrl : rpcWsUrl}/>

      <h3 className='no-marg-bott'>
        Filestorage Endpoint
      </h3>
      <CopySurface url={checked ? fsUrl : fsHttpUrl}/>
      
      <h3 className='no-marg-bott'>
        Chain ID
      </h3>
      <CopySurface url={schainHash}/>

      <div className='marg-top-30 marg-bott-20 flex-container'>
        <div className='flex-container marg-ri-20'>
          <MetamaskSurface 
            url={rpcUrl}
            chainId={schainHash}
            chainName={props.schainName}
            explorerUrl={explorerUrl}
          />
        </div>
        <div className='flex-container'>
          {EXPLORER_URL ? (
            <div>
              <LinkSurface url={explorerUrl} text='Go to block explorer'/>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
