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
 * @file SchainsAccordion.js
 * @copyright SKALE Labs 2021-Present
*/

import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

import BlurOnIcon from '@mui/icons-material/BlurOn';
import BlurOffIcon from '@mui/icons-material/BlurOff';

import SchainDetails from './SchainDetails'

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

function timestampToDate(ts) {
  return new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(ts * 1000)
}

export default function SchainsAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {props.schains.map((schain) => (
        <Accordion key={schain[0]} expanded={expanded === schain[0]} onChange={handleChange(schain[0])}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 6 }}>
            <div className="flex-container marg-left-10">
              <div className="flex-container fl-centered">
                <OfflineBoltIcon sx={{ color: stringToColour(schain[0]) }} className='opacityIcon'/>
              </div>
              <p className="schain-name flex-container fl-grow">
                {schain[0]}
              </p>

              <Tooltip title="SKALE chain creation date">
                <h6 className="no-marg fl-centered flex-container chainInfoText">
                  {timestampToDate(schain[5])}
                </h6>
              </Tooltip>

              <Tooltip title={"SKALE chain v" + (schain[9] + 1)}>
                {(schain[9] == 0) ? (
                  <div className="marg-left-10 marg-ri-10 fl-centered flex-container">
                    <LooksOneIcon className='chainInfoIcon'/>
                  </div>
                ) : (
                  <div className="marg-left-10 marg-ri-10 fl-centered flex-container">
                    <LooksTwoIcon className='chainInfoIcon'/>
                  </div>
                )}
              </Tooltip>

              <Tooltip title={"Multitransaction mode is " + (schain[11] ? "ON" : "OFF")}>
                {(schain[11]) ? (
                  <div className="marg-ri-10 fl-centered flex-container">
                    <BlurOnIcon className='chainInfoIcon'/>
                  </div>
                ) : (
                  <div className="marg-ri-10 fl-centered flex-container">
                    <BlurOffIcon className='chainInfoIcon'/>
                  </div>
                )}
              </Tooltip>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SchainDetails schainName={schain[0]} connected={props.connected} />
        </AccordionDetails>
      </Accordion>
      ))}
    </div>
  );
}
