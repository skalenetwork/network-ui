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
 * @file Schain.js
 * @copyright SKALE Labs 2022-Present
*/

import React from 'react';

import { useParams } from "react-router-dom";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SchainDetails from './SchainDetails';
import SChainOptions from './SChainOptions';


export default function Schain(props) {
  let { name } = useParams();

  if (!props.schains || !props.chainsMeta) {
    return;
  }

  const chain = props.schains.find(schain => schain[0] === name);

  if (!chain) {
    return <h1>No such chain: {name}</h1>;
  }

  return (
    <div>
      <div className="marg-bott-20">
        <div className="flex-container fl-centered">
          <Breadcrumbs aria-label="breadcrumb" className="fl-grow">
            <Link className='undec' to="/">
              <ArrowBackIosIcon style={{ 'height': '12px', 'width': '15px' }} />
              SKALE Chains
            </Link>
            <Typography color="text.primary">{name}</Typography>
          </Breadcrumbs>
          {chain ? <SChainOptions chainMeta={props.chainsMeta[name]} schain={chain} /> : null}
        </div>
      </div>
      <SchainDetails
        schainName={name}
        chainMeta={props.chainsMeta[name]}
        connected={true}
        icons={props.icons}
      />
    </div>
  )
}

