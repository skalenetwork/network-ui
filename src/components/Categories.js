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
import CategorySection from './CategorySection';


export default function Categories(props) {
  return (
    <div className='categories'>
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

