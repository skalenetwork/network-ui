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
 * @file SecureSwitch.js
 * @copyright SKALE Labs 2021-Present
*/

import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function SecureSwitch(props) {
  const handleChange = (event) => {
    props.setChecked(event.target.checked);
  };

  return (
    <FormControlLabel 
        control={
        <Switch
            color='secondary'
            checked={props.checked} 
            onChange={handleChange} 
            inputProps={{ 'aria-label': 'controlled' }}
        />} 
        label="HTTPS/WSS"
    />)
}