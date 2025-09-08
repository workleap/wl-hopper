import { paginateContent } from "./cursor-pagination.js";

// Example usage of the new cursor-based pagination
function demonstratePagination() {
    const longContent = "This is a very long piece of content that will be split into multiple pages. ".repeat(100);

    console.log("=== Cursor-Based Pagination Demo ===\n");

    // First call: Start pagination with page_size
    console.log("1. First call with page_size: 1000");
    const page1 = paginateContent(longContent, 1000);
    console.log(`   - Content length: ${page1.content.length} chars`);
    console.log(`   - Has more: ${page1.hasMore}`);
    console.log(`   - Current page: ${page1.currentPage}`);
    console.log(`   - Total pages: ${page1.totalPages}`);
    console.log(`   - Next cursor: ${page1.nextCursor ? page1.nextCursor.substring(0, 20) + "..." : "none"}\n`);

    if (page1.nextCursor) {
        // Second call: Continue with cursor (no page_size needed)
        console.log("2. Second call with cursor from previous response:");
        const page2 = paginateContent(longContent, undefined, page1.nextCursor);
        console.log(`   - Content length: ${page2.content.length} chars`);
        console.log(`   - Has more: ${page2.hasMore}`);
        console.log(`   - Current page: ${page2.currentPage}`);
        console.log(`   - Total pages: ${page2.totalPages}\n`);

        // Try to change page_size with cursor (should fail)
        console.log("3. Attempting to change page_size during pagination:");
        try {
            paginateContent(longContent, 2000, page1.nextCursor); // This should throw
        } catch (error) {
            console.log(`   - ✓ Error as expected: ${(error as Error).message}\n`);
        }
    }

    console.log("4. Starting fresh pagination with different page_size:");
    const newPage1 = paginateContent(longContent, 2000);
    console.log(`   - Content length: ${newPage1.content.length} chars`);
    console.log(`   - Current page: ${newPage1.currentPage}`);
    console.log(`   - Total pages: ${newPage1.totalPages}`);
    console.log("   - ✓ Different chunk boundaries due to different page_size");
}

export { demonstratePagination };
