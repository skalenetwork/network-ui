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
 * @file MetamaskSurface.js
 * @copyright SKALE Labs 2021-Present
*/

import React from 'react';

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

import metamaskLogo from '../metamask-fox.svg';

const NETWORK_NAME = process.env["REACT_APP_NETWORK_NAME"];

export default function MetamaskSurface(props) {

  const networkParams = {
    chainId: props.chainId,
    chainName: NETWORK_NAME + " sChain | " + props.chainName,
    rpcUrls: [props.url],
    nativeCurrency: {
        name: "SKALE ETH",
        symbol: "skETH",
        decimals: 18
    }
  }

  async function addNetwork() {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [networkParams],
    });
  }

  return (
    <div>
        <div className='undec' onClick={addNetwork}>
            <Tooltip title="Click to add Metamask network">
              <Button
                onClick={addNetwork}
                variant="contained"
                startIcon={<img src={metamaskLogo} alt="logo" className='btnIcon'/>}
                size="large"
                className='MetamaskSurface'
              >
                Add to Metamask
              </Button>
            </Tooltip>
        </div>
    </div>
  );
}
