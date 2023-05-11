import { Card, CardActionArea, Grid } from '@mui/material';
import React from 'react';

export function Stats() {
    return (
        <>
            <h3>Statistics</h3>
            {/* <Grid item style={{ width: '23em' }}> */}
            <Card
                sx={{
                    height: '280px',
                    width: '380px',
                    display: 'flex',
                    borderRadius: '20px',
                }}
            >
                <CardActionArea>
                    <h1>
                        stats
                        {/* <FontAwesomeIcon icon={faPlus} size="lg" /> */}
                    </h1>
                </CardActionArea>
            </Card>
        </>
    );
}
