/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article block
 *
 * Source: https://wknd.site/us/en.html
 * Base Block: cards
 *
 * Block Structure (from markdown example):
 * - Row 1: Block name header ("Cards-Article")
 * - Row 2-N: Each card as 2-column row: image in col 1, text content (linked title + description) in col 2
 *
 * Source HTML Pattern:
 * <div class="image-list list">
 *   <ul class="cmp-image-list">
 *     <li class="cmp-image-list__item">
 *       <article class="cmp-image-list__item-content">
 *         <a class="cmp-image-list__item-image-link" href="...">
 *           <div class="cmp-image-list__item-image">
 *             <div class="cmp-image">
 *               <img class="cmp-image__image" src="..." alt="...">
 *             </div>
 *           </div>
 *         </a>
 *         <a class="cmp-image-list__item-title-link" href="...">
 *           <span class="cmp-image-list__item-title">Title</span>
 *         </a>
 *         <span class="cmp-image-list__item-description">Description text</span>
 *       </article>
 *     </li>
 *     ... (more items)
 *   </ul>
 * </div>
 *
 * Generated: 2026-02-25
 */
export default function parse(element, { document }) {
  // Find all card items
  // VALIDATED: .cmp-image-list__item exists in captured DOM (lines 283, 298, 313, 328, 393, 408, 423, 438)
  const items = element.querySelectorAll('.cmp-image-list__item');

  const cells = [];

  items.forEach((item) => {
    // Extract image
    // VALIDATED: .cmp-image-list__item-image img, .cmp-image__image exists in captured DOM
    const img = item.querySelector('.cmp-image-list__item-image img, .cmp-image__image');

    // Extract title link
    // VALIDATED: .cmp-image-list__item-title-link exists in captured DOM (lines 292, 307, 322, 338)
    const titleLink = item.querySelector('.cmp-image-list__item-title-link');

    // Extract description
    // VALIDATED: .cmp-image-list__item-description exists in captured DOM (lines 295, 310, 325, 341)
    const description = item.querySelector('.cmp-image-list__item-description');

    // Build image cell (column 1)
    const imageCell = [];
    if (img) {
      imageCell.push(img.cloneNode(true));
    }

    // Build content cell (column 2): linked title + description
    const contentCell = [];
    if (titleLink) {
      contentCell.push(titleLink.cloneNode(true));
    }
    if (description) {
      contentCell.push(description.cloneNode(true));
    }

    // Each card is a row with 2 columns: [image, content]
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Article', cells });
  element.replaceWith(block);
}
