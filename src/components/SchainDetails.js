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

import React, { useState, useEffect } from 'react';
import CopySurface from './CopySurface';

export const BASE_PROXY_URL = process.env["REACT_APP_BASE_PROXY_URL"];


function getRpcUrl(schainName) {
  return BASE_PROXY_URL + '/v1/' + schainName;
}

function getFsUrl(schainName) {
  return BASE_PROXY_URL + '/fs/' + schainName;
}

export default function SchainDetails(props) {
  const [copy, setCopied] = useState(undefined);

  const rpcUrl = getRpcUrl(props.schainName);
  const fsUrl = getFsUrl(props.schainName);
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
    </div>
  );
}
