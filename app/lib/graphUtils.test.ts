import { processGraphData } from './graphUtils';
import { BookData } from '../types';

describe('processGraphData', () => {
    it('should create links between books of the same group (author)', () => {
        const input: BookData = {
            nodes: [
                { id: 'Book1', group: 'AuthorA' },
                { id: 'Book2', group: 'AuthorA' },
                { id: 'Book3', group: 'AuthorB' },
            ],
            links: []
        };

        const result = processGraphData(input);

        // Expect implicit link between Book1 and Book2 (Same Author)
        // We expect exactly 1 link for 2 items in clique
        expect(result.links).toHaveLength(1);
        expect(result.links[0]).toEqual(expect.objectContaining({
            source: 'Book1',
            target: 'Book2'
        }));
    });

    it('should create a clique for 3 books of same author', () => {
        const input: BookData = {
            nodes: [
                { id: 'A1', group: 'AuthorX' },
                { id: 'A2', group: 'AuthorX' },
                { id: 'A3', group: 'AuthorX' },
            ],
            links: []
        };

        const result = processGraphData(input);

        // 3 nodes fully connected: 3 connections (A1-A2, A1-A3, A2-A3)
        expect(result.links).toHaveLength(3);

        const pairs = result.links.map(l => [l.source, l.target].sort().join('-'));
        expect(pairs).toContain('A1-A2');
        expect(pairs).toContain('A1-A3');
        expect(pairs).toContain('A2-A3');
    });

    it('should preserve existing explicit links', () => {
        const input: BookData = {
            nodes: [
                { id: 'Book1', group: 'AuthorA' },
                { id: 'Book2', group: 'AuthorA' },
            ],
            links: [
                { source: 'Book1', target: 'ExternalBook', description: 'Explicit' }
            ]
        };

        const result = processGraphData(input);

        // 1 implicit + 1 explicit = 2
        expect(result.links).toHaveLength(2);
        expect(result.links).toEqual(expect.arrayContaining([
            expect.objectContaining({ description: 'Explicit' }),
            expect.objectContaining({ description: 'Same Author' })
        ]));
    });
});
