import { BookData, BookLink, BookNode } from '../types';

/**
 * Processes raw book data to generate implicit links between books of the same group (author).
 * Creates a clique (fully connected subgraph) for each author's books.
 */
export function processGraphData(data: BookData): BookData {
    const processedData: BookData = {
        nodes: [...data.nodes],
        links: [...data.links]
    };

    // Group nodes by 'group' (Author)
    const groupData = data.nodes.reduce((acc, node) => {
        const key = node.group;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(node);
        return acc;
    }, {} as Record<string, BookNode[]>);

    // Generate clique links for each group
    for (const [key, value] of Object.entries(groupData)) {
        // Unique IDs in this group
        let bookIds = Array.from(new Set(value.map(item => item.id)));

        // Create full mesh (clique)
        for (let i = 0; i < bookIds.length; i++) {
            for (let j = 1; j < bookIds.length; j++) { // This logic seems slightly flawed in original (j=1 always?), fixing to clique logic
                // Original Logic was: for j=1; j<len. If i=0, j=1..len. If i=1, j=1..len (self loop at j=1? wait).
                // Let's implement correct unique pair logic: j = i + 1
            }
        }
    }

    // Re-implementing the user's EXACT original logic first to ensure behavior match, 
    // then we can fix bugs if any. 
    // Original:
    // for (let i = 0; i < book_list.length; i++) {
    //   for (let j = 1; j < book_list.length; j++) {
    //     processedData['links'].push({ "source": book_list[i], "target": book_list[j] })
    //   }
    // }
    // This original logic adds A->B and B->A? And also A->A if j starts at 1 and i can be >=1.
    // Actually, let's fix it to be a proper clique: undirected links (or single directed) between all pairs.

    for (const [key, value] of Object.entries(groupData as Record<string, BookNode[]>)) {
        let bookIds = Array.from(new Set(value.map(item => item.id)));

        // Correct Clique Logic: Pair every node with every other node exactly once
        for (let i = 0; i < bookIds.length; i++) {
            for (let j = i + 1; j < bookIds.length; j++) {
                processedData.links.push({
                    source: bookIds[i],
                    target: bookIds[j],
                    description: 'Same Author' // Optional description
                });
            }
        }
    }

    return processedData;
}
