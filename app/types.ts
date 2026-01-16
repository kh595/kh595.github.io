export interface BookNode {
    id: string;      // Title
    group: string;   // Author
    year?: number;   // Publication Year (Optional)
    color?: string;  // For visualization (auto-assigned by d3 usually, but good to have)
    val?: number;    // For size (if used)
}

export interface BookLink {
    source: string | BookNode; // ID or Object (d3 transforms this)
    target: string | BookNode;
    description?: string;
}

export interface BookData {
    nodes: BookNode[];
    links: BookLink[];
}
