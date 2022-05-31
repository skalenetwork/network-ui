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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';

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

export default function SchainsAccordion(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {props.schains.map((schainName) => (
        <Accordion key={schainName} expanded={expanded === schainName} onChange={handleChange(schainName)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <div className="flex-container marg-left-10">
              <div className="flex-container fl-centered">
                <OfflineBoltIcon sx={{ color: stringToColour(schainName) }} className='opacityIcon'/>
              </div>
              <p className="schain-name flex-container">
                {schainName}
              </p>
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SchainDetails schainName={schainName} connected={props.connected} />
        </AccordionDetails>
      </Accordion>
      ))}
    </div>
  );
}
