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
 * @file LinkSurface.js
 * @copyright SKALE Labs 2021-Present
*/

import React from 'react';

import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonBase from '@mui/material/ButtonBase';

export default function LinkSurface(props) {
  return (
    <div>
        <a target="_blank" href={props.url} className='undec'>
            <Tooltip title="Click to follow the link">
                <ButtonBase className='copyBoard linkSurface flex-container'>
                    <div className="flex-container fl-centered-vert fl-grow">
                      <code>
                          {props.url}
                      </code>
                    </div>
                    <div className="flex-container">
                    <ArrowForwardIcon className='linkSurfaceIcon'/>
                    </div>
                </ButtonBase>
            </Tooltip>
          
        </a>
    </div>
  );
}
