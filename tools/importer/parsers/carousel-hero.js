/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-hero block
 *
 * Source: https://wknd.site/us/en.html
 * Base Block: carousel
 *
 * Block Structure (from markdown example):
 * - Row 1: Block name header ("Carousel-Hero")
 * - Row 2-N: Each slide as 2-column row: image in col 1, text content in col 2
 *
 * Source HTML Pattern:
 * <div class="carousel cmp-carousel--hero">
 *   <div class="cmp-carousel">
 *     <div class="cmp-carousel__content">
 *       <div class="cmp-carousel__item">
 *         <div class="teaser cmp-teaser--hero">
 *           <div class="cmp-teaser">
 *             <div class="cmp-teaser__content">
 *               <h2 class="cmp-teaser__title">...</h2>
 *               <div class="cmp-teaser__description">...</div>
 *               <div class="cmp-teaser__action-container">
 *                 <a class="cmp-teaser__action-link">...</a>
 *               </div>
 *             </div>
 *             <div class="cmp-teaser__image">
 *               <div class="cmp-image">
 *                 <img class="cmp-image__image" src="..." alt="...">
 *               </div>
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *       ... (more slides)
 *     </div>
 *   </div>
 * </div>
 *
 * Generated: 2026-02-25
 */
export default function parse(element, { document }) {
  // Find all carousel slide items
  // VALIDATED: .cmp-carousel__item exists in captured DOM (lines 168, 189, 210)
  const slides = element.querySelectorAll('.cmp-carousel__item');

  const cells = [];

  slides.forEach((slide) => {
    // Extract image from slide
    // VALIDATED: .cmp-teaser__image .cmp-image__image exists in captured DOM
    const img = slide.querySelector('.cmp-teaser__image .cmp-image__image, .cmp-teaser__image img');

    // Extract text content
    // VALIDATED: .cmp-teaser__title (h2) exists in captured DOM (lines 172, 193, 214)
    const title = slide.querySelector('.cmp-teaser__title, h2');

    // VALIDATED: .cmp-teaser__description exists in captured DOM (lines 175, 196, 217)
    const description = slide.querySelector('.cmp-teaser__description');

    // VALIDATED: .cmp-teaser__action-link exists in captured DOM (lines 177, 198, 221)
    const cta = slide.querySelector('.cmp-teaser__action-link, .cmp-teaser__action-container a');

    // Build image cell (column 1)
    const imageCell = [];
    if (img) {
      const imgClone = img.cloneNode(true);
      imageCell.push(imgClone);
    }

    // Build content cell (column 2): heading + description + CTA
    const contentCell = [];
    if (title) {
      const titleClone = title.cloneNode(true);
      contentCell.push(titleClone);
    }
    if (description) {
      const descClone = description.cloneNode(true);
      contentCell.push(descClone);
    }
    if (cta) {
      const ctaClone = cta.cloneNode(true);
      contentCell.push(ctaClone);
    }

    // Each slide is a row with 2 columns: [image, content]
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'Carousel-Hero', cells });
  element.replaceWith(block);
}
