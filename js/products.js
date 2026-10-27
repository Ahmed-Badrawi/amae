/**
 * amae - Products Catalogue Logic
 * Search, Category Filtering, Product Details View, and Quotation Prefill
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const searchInput = document.getElementById('productSearchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const purchasingFilter = document.getElementById('purchasingType');
  const tabChips = document.querySelectorAll('.tab-chip');
  const productCards = document.querySelectorAll('.product-item');
  const noResultsBox = document.getElementById('noResultsBox');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  // Modals
  const detailModal = document.getElementById('productDetailModal');
  const detailClose = document.getElementById('productDetailClose');
  const modalDismissBtn = document.getElementById('modalDismissBtn');
  const modalQuoteThisItem = document.getElementById('modalQuoteThisItem');

  const inquiryModal = document.getElementById('inquiryModal');
  const targetProductInput = document.getElementById('targetProduct');

  // Trigger buttons
  const openMainB2BQuote = document.getElementById('openMainB2BQuote');
  const openNavQuoteBtn = document.getElementById('openNavQuoteBtn');
  const openMobileQuoteBtn = document.getElementById('openMobileQuoteBtn');
  const footerQuoteBtn = document.getElementById('footerQuoteBtn');
  const contactProductBtn = document.getElementById('contactProductBtn');

  let currentSelectedProduct = '';

  // 1. Live Filter & Search Function
  function filterCatalogue() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedCat = categoryFilter ? categoryFilter.value : 'all';
    const selectedPurchasing = purchasingFilter ? purchasingFilter.value : 'all';

    let visibleCount = 0;

    productCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      const cardType = card.getAttribute('data-type'); // 'both' or 'b2b'
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      const desc = card.querySelector('.product-desc').textContent.toLowerCase();
      const sku = card.querySelector('.product-sku').textContent.toLowerCase();

      // Category matching
      const matchesCategory = (selectedCat === 'all' || cardCat === selectedCat);

      // Purchasing type matching
      let matchesPurchasing = true;
      if (selectedPurchasing === 'b2b') {
        matchesPurchasing = (cardType === 'b2b' || cardType === 'both');
      } else if (selectedPurchasing === 'retail') {
        matchesPurchasing = (cardType === 'both');
      }

      // Keyword matching
      const matchesSearch = !searchTerm || 
                            title.includes(searchTerm) || 
                            desc.includes(searchTerm) || 
                            sku.includes(searchTerm);

      if (matchesCategory && matchesPurchasing && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsBox) {
      noResultsBox.style.display = (visibleCount === 0) ? 'block' : 'none';
    }
  }

  // Event Listeners for Filters
  if (searchInput) searchInput.addEventListener('input', filterCatalogue);
  if (categoryFilter) categoryFilter.addEventListener('change', () => {
    syncTabChips(categoryFilter.value);
    filterCatalogue();
  });
  if (purchasingFilter) purchasingFilter.addEventListener('change', filterCatalogue);

  // Tab Chips Handling
  tabChips.forEach(chip => {
    chip.addEventListener('click', () => {
      tabChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filterValue = chip.getAttribute('data-filter');
      
      if (categoryFilter) {
        categoryFilter.value = filterValue;
      }
      filterCatalogue();
    });
  });

  function syncTabChips(catValue) {
    tabChips.forEach(c => {
      if (c.getAttribute('data-filter') === catValue) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  }

  // Reset Filters
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (categoryFilter) categoryFilter.value = 'all';
      if (purchasingFilter) purchasingFilter.value = 'all';
      syncTabChips('all');
      filterCatalogue();
    });
  }

  // 2. View Product Information Modal
  const viewDetailBtns = document.querySelectorAll('.view-details-btn');
  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productName = btn.getAttribute('data-product');
      const productCat = btn.getAttribute('data-cat');
      const productDesc = btn.getAttribute('data-desc');
      const productSpecs = btn.getAttribute('data-specs');

      currentSelectedProduct = productName;

      document.getElementById('detailTitle').textContent = productName;
      document.getElementById('detailCatTag').textContent = productCat;
      document.getElementById('detailDesc').textContent = productDesc;
      document.getElementById('detailSpecsSheet').textContent = productSpecs;

      if (detailModal) {
        detailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeDetailModal() {
    if (detailModal) {
      detailModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (detailClose) detailClose.addEventListener('click', closeDetailModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeDetailModal);

  // 3. Request a Quotation Handlers with Product Prefill
  function openQuoteWithItem(itemName = '') {
    closeDetailModal();
    if (targetProductInput) {
      targetProductInput.value = itemName;
    }
    if (inquiryModal) {
      inquiryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  // Individual Card "Inquire / Quote" button
  document.querySelectorAll('.open-quote-for-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const pName = btn.getAttribute('data-product-name');
      openQuoteWithItem(pName);
    });
  });

  // Modal's direct quote button
  if (modalQuoteThisItem) {
    modalQuoteThisItem.addEventListener('click', () => {
      openQuoteWithItem(currentSelectedProduct);
    });
  }

  // General quotation triggers
  if (openMainB2BQuote) openMainB2BQuote.addEventListener('click', () => openQuoteWithItem(''));
  if (openNavQuoteBtn) openNavQuoteBtn.addEventListener('click', () => openQuoteWithItem(''));
  if (openMobileQuoteBtn) openMobileQuoteBtn.addEventListener('click', () => openQuoteWithItem(''));
  if (footerQuoteBtn) footerQuoteBtn.addEventListener('click', () => openQuoteWithItem(''));
  if (contactProductBtn) contactProductBtn.addEventListener('click', () => openQuoteWithItem('General Product Availability Enquiry'));

  // Close Detail Modal on backdrop click
  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeDetailModal();
    });
  }
});
