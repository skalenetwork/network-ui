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
 * @file ChainCard.js
 * @copyright SKALE Labs 2022-Present
*/

import * as React from 'react';

import { Link } from "react-router-dom";

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

import BlurOnIcon from '@mui/icons-material/BlurOn';
import BlurOffIcon from '@mui/icons-material/BlurOff';

import { stringToColour, timestampToDate } from '../helper';
import { CHAINS_META } from '../constants';

const tinycolor = require("tinycolor2");


function getChainName(schainName) {
  if (CHAINS_META[schainName]) {
    return CHAINS_META[schainName]['alias'];
  }
  return schainName;
}

function getBgColor(schainName) {
  if (CHAINS_META[schainName]) {
    return CHAINS_META[schainName]['background'];
  }
  return stringToColour(schainName);
}


export default function ChainCard(props) {

  function getIcon(schainName) {
    let iconPath = schainName + '.png';
    if (props.icons[iconPath]) {
      return <img alt='logo' src={props.icons[iconPath].default}/>
    }
    return <OfflineBoltIcon className='default-chain-icon'/>;
  }

  return (
    <div>
      <div className='fl-centered'>
        <Link to={'chains/' + props.schain[0]}>
          <Button
            className='app-icon'
            style={{ backgroundColor: getBgColor(props.schain[0]) }}
          >
            {getIcon(props.schain[0])}
          </Button>
        </Link>
        <div className='flex-container fl-centered app-bott' style={{ backgroundColor: getBgColor(props.schain[0]) }}>
        <div className={'app-bott-ins flex-container fl-centered ' + (tinycolor(getBgColor(props.schain[0])).isLight() ? '' : 'app-bott-dark')}>
            <Tooltip title="SKALE chain creation date">
              <h6 className="no-marg fl-centered flex-container chainInfoText">
                {timestampToDate(props.schain[5])}
              </h6>
            </Tooltip>

            <Tooltip title={"SKALE chain v1" + (props.schain[9] + 1)}>
              {(props.schain[9] === 0) ? (
                <div className="marg-left-10 marg-ri-10 fl-centered flex-container">
                  <LooksOneIcon className='chainInfoIcon' />
                </div>
              ) : (
                <div className="marg-left-10 marg-ri-10 fl-centered flex-container">
                  <LooksTwoIcon className='chainInfoIcon' />
                </div>
              )}
            </Tooltip>

            <Tooltip title={"Multitransaction mode is " + (props.schain[11] ? "ON" : "OFF")}>
              {(props.schain[11]) ? (
                <div className="marg-ri-10 fl-centered flex-container">
                  <BlurOnIcon className='chainInfoIcon' />
                </div>
              ) : (
                <div className="marg-ri-10 fl-centered flex-container">
                  <BlurOffIcon className='chainInfoIcon' />
                </div>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
      <p className="schain-name flex-container fl-centered">
        {getChainName(props.schain[0])}
      </p>
    </div>
  );
}
