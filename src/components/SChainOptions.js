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
 * @file SchainOptions.js
 * @copyright SKALE Labs 2022-Present
*/

import React from 'react';

import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

import BlurOnIcon from '@mui/icons-material/BlurOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CategoryIcon from '@mui/icons-material/Category';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { timestampToDate, capitalize } from '../helper';


export default function SChainOptions(props) {
  function v1(schain) {
    return (schain[9] === 0);
  }

  function multiMode(schain) {
    return schain[11];
  }

  function getCategory() {
    if (props.chainMeta) {
      return capitalize(props.chainMeta['category']);
    }
    return 'Other';
  }

  if (!props.schain) return;

  return (
    <Stack justifyContent="flex-end" direction="row" spacing={1} className="schain-options">
      <Chip label='Gen' icon={v1(props.schain) ? <LooksOneIcon /> : <LooksTwoIcon />} />
      {multiMode(props.schain) ? <Chip label='Mutitransaction' icon={<BlurOnIcon />} /> : null}
      <Chip label={'' + timestampToDate(props.schain[5])} icon={<AccessTimeFilledIcon />} />
      <Chip label={'' + getCategory(props.schain[0])} icon={<CategoryIcon />} />
    </Stack>
  );
}
