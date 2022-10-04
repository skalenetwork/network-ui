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
 * @file Categories.js
 * @copyright SKALE Labs 2022-Present
*/

import React from 'react';

import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import CategorySection from './CategorySection';


export default function Categories(props) {
  return (
    <div className='categories'>
      <div className='marg-top-40'>
        <Paper elevation={3} className='topBannerNew flex-container fl-centered-vert'>
          <Chip label="LIVE" color="success" variant="outlined" className='marg-ri-20' />
          <p className='fl-grow'>Transfer assets between Ethereum Mainnet and SKALE Chains</p>
          <Button size="small" variant="contained website-btn chain-btn" onClick={props.metaport.open}>
            Open Metaport
          </Button>
        </Paper>
      </div>
      <CategorySection
        icons={props.icons}
        category='Applications'
        schains={props.schains.filter(schain => props.chainsMeta[schain[0]] && props.chainsMeta[schain[0]]['category'] === 'apps')}
      />
      <CategorySection
        icons={props.icons}
        category='Games'
        schains={props.schains.filter(schain => props.chainsMeta[schain[0]] && props.chainsMeta[schain[0]]['category'] === 'games')}
      />
      <CategorySection
        icons={props.icons}
        category='Other chains'
        schains={props.schains.filter(schain => !props.chainsMeta[schain[0]])}
      />
    </div>
  )
}

