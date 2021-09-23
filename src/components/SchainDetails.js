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

import React from 'react';
import CopySurface from './CopySurface';
import LinkSurface from './LinkSurface';

export const BASE_PROXY_URL = process.env["REACT_APP_BASE_PROXY_URL"];
export const EXPLORER_URL = process.env["REACT_APP_EXPLORER_URL"];


function getRpcUrl(schainName) {
  return BASE_PROXY_URL + '/v1/' + schainName;
}

function getFsUrl(schainName) {
  return BASE_PROXY_URL + '/fs/' + schainName;
}

function getExplorerUrl(schainName) {
  return 'http://' + schainName + '.' + EXPLORER_URL;
}

export default function SchainDetails(props) {
  const rpcUrl = getRpcUrl(props.schainName);
  const fsUrl = getFsUrl(props.schainName);
  const explorerUrl = getExplorerUrl(props.schainName);
  const schainHash = props.skale.web3.utils.soliditySha3(props.schainName).substring(0, 15);

  return (
    <div className='schain-details'>
      <h3>
        RPC Endpoint
      </h3>
      <CopySurface url={rpcUrl}/>
      
      <h3>
        Filestorage Endpoint
      </h3>
      <CopySurface url={fsUrl}/>
      
      <h3>
        Chain ID
      </h3>
      <CopySurface url={schainHash}/>

      {EXPLORER_URL ? (
          <div>
            <h3>
              Block explorer
            </h3>
            <LinkSurface url={explorerUrl}/>
          </div>
      ) : null}

    </div>
  );
}
