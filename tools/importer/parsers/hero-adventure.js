/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-adventure block
 *
 * Source: https://wknd.site/us/en.html
 * Base Block: hero
 *
 * Block Structure (from markdown example):
 * - Row 1: Block name header ("Hero-Adventure")
 * - Row 2: Background image (1 column)
 * - Row 3: Content - heading + description + CTA (1 column)
 *
 * Source HTML Pattern:
 * <div class="teaser cmp-teaser--hero cmp-teaser--imagebottom">
 *   <div class="cmp-teaser">
 *     <div class="cmp-teaser__content">
 *       <h2 class="cmp-teaser__title">Climbing New Zealand</h2>
 *       <div class="cmp-teaser__description">...</div>
 *       <div class="cmp-teaser__action-container">
 *         <a class="cmp-teaser__action-link" href="...">See Trip</a>
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
  // Extract background image
  // VALIDATED: .cmp-teaser__image .cmp-image__image exists in captured DOM (line 377)
  const img = element.querySelector('.cmp-teaser__image .cmp-image__image, .cmp-teaser__image img');

  // Extract title
  // VALIDATED: .cmp-teaser__title (h2) exists in captured DOM (line 367)
  const title = element.querySelector('.cmp-teaser__title, h2');

  // Extract description
  // VALIDATED: .cmp-teaser__description exists in captured DOM (line 370)
  const description = element.querySelector('.cmp-teaser__description');

  // Extract CTA link
  // VALIDATED: .cmp-teaser__action-link exists in captured DOM (line 372)
  const cta = element.querySelector('.cmp-teaser__action-link, .cmp-teaser__action-container a');

  const cells = [];

  // Row 1: Background image
  if (img) {
    cells.push([img.cloneNode(true)]);
  }

  // Row 2: Content (heading + description + CTA in single column)
  const contentCell = [];
  if (title) {
    contentCell.push(title.cloneNode(true));
  }
  if (description) {
    contentCell.push(description.cloneNode(true));
  }
  if (cta) {
    contentCell.push(cta.cloneNode(true));
  }
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Adventure', cells });
  element.replaceWith(block);
}
