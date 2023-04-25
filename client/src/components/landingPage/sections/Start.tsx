import { Button } from '@mui/material';
import React from 'react';

export function Start() {
    return (
        <section className="section-1">
            <h1>One app the fitness industry loves.</h1>
            <p>Fitness has never been easier with ProTracker.</p>
            <p>
                Open a free account in minutes right from your phone or browser.
            </p>
            <Button className="get-started-btn" variant="contained">
                Get started
            </Button>
        </section>
    );
}
