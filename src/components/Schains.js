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
 * @file Schains.js
 * @copyright SKALE Labs 2021-Present
*/

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import CircularProgress from '@mui/material/CircularProgress';


import Categories from './Categories';
import Schain from './Schain';

import { CHAINS_META, ICONS } from '../constants';


export default function Schains(props) {
  const [loading, setLoading] = React.useState(true);
  const [intervalId, setIntervalId] = React.useState();
  const [schains, setSchains] = React.useState();

  const location = useLocation();

  useEffect(() => {
    loadSchains();
    let intervalId = setInterval(loadSchains, 10000);
    setIntervalId(intervalId);
  }, []);

  async function loadSchainsFile() {
    let response = await fetch('/files/chains.json');
    let chainsJson = await response.json();
    let schains = [];
    for (let chain of chainsJson) {
      schains.push(chain.schain);
    }
    return schains;
  }

  async function loadSchains() {
    let schainNames = await loadSchainsFile();
    setSchains(schainNames);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="fullscreen-msg">
        <div>
          <div className="flex-container">
            <div className="flex-container fl-centered">
              <CircularProgress className='fullscreen-spin' />
            </div>
            <div className="flex-container fl-centered">
              <h3 className='fullscreen-msg-text'>
                Loading SKALE Chains
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="marg-bott-40">
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes>
          <Route index element={<Categories icons={ICONS} schains={schains} chainsMeta={CHAINS_META} />} />
          <Route path="chains" >
            <Route path=":name" element={<Schain icons={ICONS} schains={schains} chainsMeta={CHAINS_META} />} />
          </Route>
        </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
