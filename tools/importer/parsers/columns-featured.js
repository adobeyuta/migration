/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-featured block
 *
 * Source: https://wknd.site/us/en.html
 * Base Block: columns
 *
 * Block Structure (from markdown example):
 * - Row 1: Block name header ("Columns-Featured")
 * - Row 2: 2-column row: image in col 1, text content (pretitle + heading + description + CTA) in col 2
 *
 * Source HTML Pattern:
 * <div class="teaser cmp-teaser--featured">
 *   <div class="cmp-teaser">
 *     <div class="cmp-teaser__content">
 *       <p class="cmp-teaser__pretitle">Featured Article</p>
 *       <h2 class="cmp-teaser__title">Camping in Western Australia</h2>
 *       <div class="cmp-teaser__description">...</div>
 *       <div class="cmp-teaser__action-container">
 *         <a class="cmp-teaser__action-link" href="...">Full Article</a>
 *       </div>
 *     </div>
 *     <div class="cmp-teaser__image">
 *       <div class="cmp-image">
 *         <img class="cmp-image__image" src="..." alt="...">
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-25
 */
export default function parse(element, { document }) {
  // Extract image
  // VALIDATED: .cmp-teaser__image .cmp-image__image exists in captured DOM (line 270)
  const img = element.querySelector('.cmp-teaser__image .cmp-image__image, .cmp-teaser__image img');

  // Extract pretitle
  // VALIDATED: .cmp-teaser__pretitle exists in captured DOM (line 259)
  const pretitle = element.querySelector('.cmp-teaser__pretitle');

  // Extract title
  // VALIDATED: .cmp-teaser__title (h2) exists in captured DOM (line 260)
  const title = element.querySelector('.cmp-teaser__title, h2');

  // Extract description
  // VALIDATED: .cmp-teaser__description exists in captured DOM (line 263)
  const description = element.querySelector('.cmp-teaser__description');

  // Extract CTA link
  // VALIDATED: .cmp-teaser__action-link exists in captured DOM (line 265)
  const cta = element.querySelector('.cmp-teaser__action-link, .cmp-teaser__action-container a');

  // Build image cell (column 1)
  const imageCell = [];
  if (img) {
    imageCell.push(img.cloneNode(true));
  }

  // Build content cell (column 2): pretitle + heading + description + CTA
  const contentCell = [];
  if (pretitle) {
    contentCell.push(pretitle.cloneNode(true));
  }
  if (title) {
    contentCell.push(title.cloneNode(true));
  }
  if (description) {
    contentCell.push(description.cloneNode(true));
  }
  if (cta) {
    contentCell.push(cta.cloneNode(true));
  }

  // Single row with 2 columns: [image, content]
  const cells = [
    [imageCell, contentCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Featured', cells });
  element.replaceWith(block);
}
