import { Card, CardActionArea, Divider, Grid } from '@mui/material';
import React from 'react';
import { UsersSignedUp } from './UsersSignedUp';
import { WorkoutsInSystem } from './WorkoutsInSystem';

export function Stats() {
    return (
        <div className="stats-section">
            <h3>Statistics</h3>
            {/* <Grid item style={{ width: '23em' }}> */}
            <Card
                sx={{
                    height: '300px',
                    // width: '380px',
                    display: 'flex',
                    borderRadius: '20px',
                }}
            >
                <CardActionArea>
                    <UsersSignedUp />
                </CardActionArea>
            </Card>
            <br />

            <Card
                sx={{
                    height: '350px',
                    // width: '500px',
                    display: 'flex',
                    borderRadius: '20px',
                }}
            >
                <CardActionArea>
                    <WorkoutsInSystem />
                </CardActionArea>
            </Card>
        </div>
    );
}
