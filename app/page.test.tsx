import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Main Menu (Home)', () => {
    it('renders the main title', () => {
        render(<Home />);
        const heading = screen.getByRole('heading', { level: 1, name: /Book Network/i });
        expect(heading).toBeInTheDocument();
    });

    it('renders navigation cards', () => {
        render(<Home />);

        // Check for main feature cards
        expect(screen.getByText('Knowledge Network')).toBeInTheDocument();
        expect(screen.getByText('Chronological Timeline')).toBeInTheDocument();
        expect(screen.getByText('Library Editor')).toBeInTheDocument();
    });

    it('contains correct links', () => {
        render(<Home />);

        const networkLink = screen.getByRole('link', { name: /Knowledge Network/i });
        expect(networkLink).toHaveAttribute('href', '/network');

        const timelineLink = screen.getByRole('link', { name: /Chronological Timeline/i });
        expect(timelineLink).toHaveAttribute('href', '/timeline');
    });
});
