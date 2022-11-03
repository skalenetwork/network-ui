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
import ScrollToTop from './components/ScrollToTop';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Routes, Route } from "react-router-dom";

import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Metaport, interfaces } from '@skalenetwork/metaport';

import metaportConfig from './metaportConfig.json'


let theme = createTheme({
  palette: {
    mode: 'dark'
  }
});


const metaport = metaportConfig.skaleNetwork ? new Metaport(metaportConfig) : null;


function App() {
  const [connected, setConnected] = useState(undefined);
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <div className="AppWrap">
        <Header connected={connected} setConnected={setConnected} />
        <div className="mainApp">
          <div id='appContentScroll' className="appContent">
            <Box component="span" m={1} >
              <Container maxWidth="md">
                <Schains metaport={metaport} />
              </Container>
            </Box>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
