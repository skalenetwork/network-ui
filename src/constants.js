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
 * @file constants.js
 * @copyright SKALE Labs 2022-Present
*/

import { importAll } from './helper';


export const CHAINS_META = require('./meta/chains.json');
export const ICONS = importAll(require.context('./meta/logos', false, /\.(png|jpe?g|svg|gif)$/));

export const CHAIN_ID = process.env["REACT_APP_CHAIN_ID"];
export const NETWORK_NAME = process.env["REACT_APP_NETWORK_NAME"];
