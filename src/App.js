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
 * @file App.js
 * @copyright SKALE Labs 2021-Present
*/

import './App.css';
import Header from './components/Header';
import Schains from './components/Schains';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


import React, { useState } from 'react';

function App() {
  const [connected, setConnected] = useState(undefined);
  const [provider, setProvider] = useState(undefined);
  return (
    <div className="AppWrap">
      <Header connected={connected} setConnected={setConnected} setProvider={setProvider}/>
      <div className="mainApp">
        <Box component="span" m={1} >
          <Container maxWidth="md">
              <Schains connected={connected} provider={provider}/>
          </Container>
        </Box>
      </div>
    </div>
  );
}

export default App;
