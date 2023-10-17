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
 * @file NewBanner.js
 * @copyright SKALE Labs 2023-Present
*/

import * as React from 'react';

import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import MoveUpRoundedIcon from '@mui/icons-material/MoveUpRounded';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';

import portalImg from '../portal.png';

import { PORTAL_URLS, NETWORK_NAME } from '../constants'

const style = {
  width: "100vw",
  height: "100vh",
  outline: "none",
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(10px)",
};

export default function NewBanner(props) {
  const portalUrl = PORTAL_URLS[NETWORK_NAME];
  if (!props.bannerOpen || !portalUrl) return null;
  return (
    <Modal open={props.bannerOpen} style={style} className="br__modal flex-container fl-centered">
      <Container maxWidth="lg" className='' >
        <div className="newBanner">
          <Grid container spacing={0} className="flex-container" direction="row" justify="flex-end">
            <Grid item md={8} xs={12}>
              <div className='bannerLeft'>
                <img src={portalImg} alt="logo" className='portalImg' />
              </div>
            </Grid>
            <Grid item md={4} xs={12} className='marg-ri-20'>
              <div className='bannerRi'>
                <div className='flex-container'>
                  <h1 className='fl-grow flex-container'>
                    SKALE Portal
                  </h1>
                  <div className='flex-container'>
                    <IconButton
                      onClick={() => {
                        props.setBannerOpen(false);
                      }}
                      style={{ height: "36px", width: "36px", backgroundColor: '#363636' }}
                    >
                      <CloseRoundedIcon
                        style={{ height: "16px", width: "16px", margin: '0' }}
                      />
                    </IconButton>
                  </div>
                </div>
                <div className='marg-bott-10 flex-container fl-centeredd'>
                  <AutoAwesomeRoundedIcon className='marg-top-5' style={{ color: 'rgb(20, 233, 106)' }} />
                  <p className='text'>New home for everything SKALE</p>
                </div>
                <div className='marg-bott-10 flex-container fl-centeredd'>
                  <MoveUpRoundedIcon className='marg-top-5' style={{ color: 'rgb(238, 195, 0)' }} />
                  <p className='text'>Bridge tokens using SKALE Metaport</p>
                </div>
                <div className='marg-bott-10 flex-container fl-centeredd'>
                  <ConstructionRoundedIcon className='marg-top-5' style={{ color: 'rgb(50, 156, 255)' }} />
                  <p className='text'>Endpoints and chainIds for all SKALE Chains </p>
                </div>

                <div className='marg-bott-10 flex-container fl-centeredd'>
                  <LanRoundedIcon className='marg-top-5' style={{ color: 'rgb(239 119 31)' }} />
                  <p className='text'>Linked tokens and verified contracts info</p>
                </div>

                <div className='marg-bott-10 flex-container fl-centeredd'>
                  <WalletRoundedIcon className='marg-top-5' style={{ color: 'rgb(163, 96, 255)' }} />
                  <p className='text'>Overview of assets across all SKALE Chains</p>
                </div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={portalUrl}
                  className="undec"
                >
                  <Button
                    size="large"
                    className='actionBtn actionBtnPrimary marg-top-20'
                    startIcon={<ArrowOutwardRoundedIcon />}
                  >
                    Visit SKALE Portal
                  </Button>
                </a>
                <div className='marg-top-10'>
                  <Button
                    size="large"
                    className='actionBtn actionBtnSecondary'
                    onClick={() => { props.setBannerOpen(false) }}
                    startIcon={<GridViewRoundedIcon />}
                  >
                    Proceed to Network UI
                  </Button>
                </div>

                <p className='textGray'>SKALE Network UI you're currently using is deprecated and 
                will no longer be updated. Please, consider switching to the new SKALE Portal.</p>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Modal>
  );
}
