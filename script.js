/**
 * ============================================
 * MANGALAM HDPE PIPES - JAVASCRIPT
 * Sticky header, dropdown & mobile menu
 * ============================================
 */

(function() {
    'use strict';

    const mainHeader = document.getElementById('mainHeader');
    const stickyHeader = document.getElementById('stickyHeader');
    const mobileToggle = document.getElementById('mobileToggle');
    const stickyMobileToggle = document.getElementById('stickyMobileToggle');
    const mainNav = document.getElementById('mainNav');
    const stickyNav = document.getElementById('stickyNav');

    // ============================================
    // STICKY HEADER
    // ============================================
    // Track scroll direction
    let lastScrollY = window.pageYOffset;
    let scrollDirection = 'down';
    let firstFoldHeight = 80; // Default fallback value

    // Dynamically calculate the first fold height (hero section + main header)
    function calculateFirstFoldHeight() {
        const heroSection = document.getElementById('heroSection');
        const mainHeader = document.getElementById('mainHeader');

        let height = 80; // Default fallback

        if (mainHeader) {
            height += mainHeader.offsetHeight;
        }

        if (heroSection) {
            // Use the full hero section height as the first fold
            height = (mainHeader ? mainHeader.offsetHeight : 0) + heroSection.offsetHeight;
        }

        firstFoldHeight = height;
        return height;
    }

    // Initialize first fold height
    calculateFirstFoldHeight();

    function handleStickyHeader() {
        const scrollY = window.pageYOffset;

        // Determine scroll direction
        if (scrollY > lastScrollY) {
            scrollDirection = 'down';
        } else if (scrollY < lastScrollY) {
            scrollDirection = 'up';
        }

        // Update last scroll position
        lastScrollY = scrollY;

        // Show sticky header when scrolling DOWN past first fold
        // Hide sticky header when scrolling UP
        if (scrollY > firstFoldHeight && scrollDirection === 'down') {
            stickyHeader.classList.add('visible');
        } else {
            stickyHeader.classList.remove('visible');
        }
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleStickyHeader();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Recalculate first fold height on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            calculateFirstFoldHeight();
        }, 250);
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    function toggleMobileMenu(toggle, nav) {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            toggleMobileMenu(mobileToggle, mainNav);
        });
    }

    if (stickyMobileToggle) {
        stickyMobileToggle.addEventListener('click', function() {
            toggleMobileMenu(stickyMobileToggle, stickyNav);
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (mobileToggle && mobileToggle.classList.contains('active')) {
                toggleMobileMenu(mobileToggle, mainNav);
            }
            if (stickyMobileToggle && stickyMobileToggle.classList.contains('active')) {
                toggleMobileMenu(stickyMobileToggle, stickyNav);
            }
        });
    });

    // ============================================
    // DROPDOWN MENU
    // ============================================
    function handleDropdownClick(e) {
        const dropdown = e.target.closest('.dropdown');
        if (!dropdown) return;

        if (window.innerWidth < 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    }

    document.querySelectorAll('.dropdown-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', handleDropdownClick);
    });

    // ============================================
    // HERO IMAGE CAROUSEL WITH ZOOM
    // ============================================
    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');
    const heroImage = document.getElementById('heroImage');
    const imageSlider = document.getElementById('imageSlider');
    const zoomLens = document.getElementById('zoomLens');
    const zoomPreview = document.getElementById('zoomPreview');
    const zoomPreviewImage = document.getElementById('zoomPreviewImage');

    // Sample images - replace with actual images
    const heroImages = [
        "assets/images/Fishnet Manufacturing.jpg",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='350' viewBox='0 0 500 350'%3E%3Crect fill='%23f0f0f0' width='500' height='350'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EHDPE Pipes Product Image 2%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='350' viewBox='0 0 500 350'%3E%3Crect fill='%23e8e8e8' width='500' height='350'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EHDPE Pipes Product Image 3%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='350' viewBox='0 0 500 350'%3E%3Crect fill='%23d8d8d8' width='500' height='350'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EHDPE Pipes Product Image 4%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='350' viewBox='0 0 500 350'%3E%3Crect fill='%23c8c8c8' width='500' height='350'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EHDPE Pipes Product Image 5%3C/text%3E%3C/svg%3E"
    ];

    let currentImageIndex = 0;
    const ZOOM_LEVEL = 2.5; // Magnification level

    function updateHeroImage() {
        heroImage.style.opacity = '0';
        setTimeout(function() {
            heroImage.src = heroImages[currentImageIndex];
            zoomPreviewImage.src = heroImages[currentImageIndex];
            heroImage.style.opacity = '1';
        }, 200);
    }

    // ============================================
    // THUMBNAIL PREVIEWS FUNCTIONALITY
    // ============================================
    const thumbnails = document.querySelectorAll('.thumbnail');

    function updateThumbnails() {
        thumbnails.forEach(function(thumb, index) {
            if (index === currentImageIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    // Add click handlers to thumbnails
    thumbnails.forEach(function(thumb, index) {
        thumb.addEventListener('click', function() {
            if (index < heroImages.length) {
                currentImageIndex = index;
                updateHeroImage();
                updateThumbnails();
            }
        });
    });

    // Initialize thumbnails
    updateThumbnails();

    if (heroPrev) {
        heroPrev.addEventListener('click', function() {
            currentImageIndex--;
            if (currentImageIndex < 0) {
                currentImageIndex = heroImages.length - 1;
            }
            updateHeroImage();
            updateThumbnails();
        });
    }

    if (heroNext) {
        heroNext.addEventListener('click', function() {
            currentImageIndex++;
            if (currentImageIndex >= heroImages.length) {
                currentImageIndex = 0;
            }
            updateHeroImage();
            updateThumbnails();
        });
    }

    // Add transition to hero image
    if (heroImage) {
        heroImage.style.transition = 'opacity 0.2s ease';
    }

    // ============================================
    // IMAGE ZOOM ON HOVER FUNCTIONALITY
    // ============================================
    function handleZoom(e) {
        if (!imageSlider || !zoomLens || !zoomPreview || !zoomPreviewImage) return;

        const rect = imageSlider.getBoundingClientRect();

        // Get mouse position relative to the image
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if mouse is within the image bounds
        if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
            hideZoom();
            return;
        }

        // Show zoom elements
        zoomLens.style.display = 'block';
        zoomPreview.classList.add('active');

        // Position the zoom lens (centered on mouse)
        zoomLens.style.left = x + 'px';
        zoomLens.style.top = y + 'px';

        // Calculate position for zoom preview
        // The preview shows a magnified portion of the image
        const lensWidth = zoomLens.offsetWidth;
        const lensHeight = zoomLens.offsetHeight;

        // Calculate the percentage position
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        // Set the background position for the preview image
        // Using transform to scale and position
        const previewWidth = zoomPreview.offsetWidth;
        const previewHeight = zoomPreview.offsetHeight;

        const moveX = (xPercent * previewWidth / 100) * ZOOM_LEVEL - previewWidth / 2;
        const moveY = (yPercent * previewHeight / 100) * ZOOM_LEVEL - previewHeight / 2;

        zoomPreviewImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        zoomPreviewImage.style.transform = `scale(${ZOOM_LEVEL})`;
    }

    function hideZoom() {
        if (zoomLens) {
            zoomLens.style.display = 'none';
        }
        if (zoomPreview) {
            zoomPreview.classList.remove('active');
        }
    }

    // Add zoom event listeners to image slider
    if (imageSlider) {
        imageSlider.addEventListener('mousemove', function(e) {
            // Only enable zoom on larger screens
            if (window.innerWidth > 768) {
                handleZoom(e);
            }
        });

        imageSlider.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768 && zoomLens) {
                zoomLens.style.display = 'block';
            }
        });

        imageSlider.addEventListener('mouseleave', hideZoom);

        // Also handle touch devices
        imageSlider.addEventListener('touchstart', function(e) {
            if (window.innerWidth > 768 && e.touches.length === 1) {
                const touch = e.touches[0];
                handleZoom(touch);
            }
        });

        imageSlider.addEventListener('touchmove', function(e) {
            if (window.innerWidth > 768 && e.touches.length === 1) {
                e.preventDefault(); // Prevent scrolling while zooming
                const touch = e.touches[0];
                handleZoom(touch);
            }
        });

        imageSlider.addEventListener('touchend', hideZoom);
    }

    // Update zoom preview image source when hero image changes
    if (heroImage && zoomPreviewImage) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                    zoomPreviewImage.src = heroImage.src;
                }
            });
        });
        observer.observe(heroImage, { attributes: true });
    }

    // Disable zoom on window resize to smaller screens
    let zoomResizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(zoomResizeTimer);
        zoomResizeTimer = setTimeout(function() {
            if (window.innerWidth <= 768) {
                hideZoom();
            }
        }, 250);
    });

    // ============================================
    // FREQUENTLY BOUGHT TOGETHER CAROUSEL
    // ============================================
    const fbtPrev = document.getElementById('fbtPrev');
    const fbtNext = document.getElementById('fbtNext');
    const fbtTrack = document.getElementById('fbtTrack');
    const fbtBuyAll = document.getElementById('fbtBuyAll');

    let fbtIndex = 0;
    const fbtCards = document.querySelectorAll('.fbt-card');

    function getFbtCardsPerView() {
        const width = window.innerWidth;
        if (width >= 1200) return 4;
        if (width >= 768) return 3;
        if (width >= 480) return 2;
        return 1;
    }

    function getMaxFbtIndex() {
        const cardsPerView = getFbtCardsPerView();
        const gap = 24; // 1.5rem gap
        const cardWidth = fbtCards[0] ? fbtCards[0].offsetWidth : 220;
        const trackWidth = fbtTrack ? fbtTrack.offsetWidth : 1200;
        const totalCardsWidth = (cardWidth + gap) * fbtCards.length;
        const visibleWidth = trackWidth - 60; // minus padding/arrows space

        return Math.max(0, Math.ceil((totalCardsWidth - visibleWidth) / (cardWidth + gap)));
    }

    function updateFbtCarousel() {
        if (!fbtTrack || fbtCards.length === 0) return;

        const cardWidth = fbtCards[0].offsetWidth + 24; // width + gap
        const translateX = -(fbtIndex * cardWidth);
        fbtTrack.style.transform = 'translateX(' + translateX + 'px)';

        // Update arrow states
        if (fbtPrev) {
            fbtPrev.style.opacity = fbtIndex === 0 ? '0.5' : '1';
            fbtPrev.style.cursor = fbtIndex === 0 ? 'not-allowed' : 'pointer';
        }
        if (fbtNext) {
            const maxIndex = getMaxFbtIndex();
            fbtNext.style.opacity = fbtIndex >= maxIndex ? '0.5' : '1';
            fbtNext.style.cursor = fbtIndex >= maxIndex ? 'not-allowed' : 'pointer';
        }
    }

    if (fbtPrev) {
        fbtPrev.addEventListener('click', function() {
            if (fbtIndex > 0) {
                fbtIndex--;
                updateFbtCarousel();
            }
        });
    }

    if (fbtNext) {
        fbtNext.addEventListener('click', function() {
            const maxIndex = getMaxFbtIndex();
            if (fbtIndex < maxIndex) {
                fbtIndex++;
                updateFbtCarousel();
            }
        });
    }

    // Update carousel on window resize
    let fbtResizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(fbtResizeTimer);
        fbtResizeTimer = setTimeout(function() {
            fbtIndex = 0;
            updateFbtCarousel();
        }, 250);
    });

    // ============================================
    // IMAGE ZOOM ON HOVER / CLICK
    // ============================================
    const zoomModal = document.getElementById('zoomModal');
    const zoomModalImage = document.getElementById('zoomModalImage');
    const zoomClose = document.getElementById('zoomClose');

    // Open zoom modal on image click
    document.querySelectorAll('.fbt-product-img').forEach(function(img) {
        img.addEventListener('click', function() {
            const imgSrc = this.getAttribute('src');
            if (zoomModal && zoomModalImage) {
                zoomModalImage.setAttribute('src', imgSrc);
                zoomModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close zoom modal
    if (zoomClose) {
        zoomClose.addEventListener('click', closeZoomModal);
    }

    if (zoomModal) {
        zoomModal.addEventListener('click', function(e) {
            if (e.target === zoomModal) {
                closeZoomModal();
            }
        });
    }

    function closeZoomModal() {
        if (zoomModal) {
            zoomModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && zoomModal && zoomModal.classList.contains('active')) {
            closeZoomModal();
        }
    });

    // ============================================
    // BUY ALL BUTTON FUNCTIONALITY
    // ============================================
    if (fbtBuyAll) {
        fbtBuyAll.addEventListener('click', function() {
            alert('Thank you! All items have been added to your cart.');
        });
    }

    // Add button functionality for individual cards
    document.querySelectorAll('.fbt-add-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const card = this.closest('.fbt-card');
            const productName = card.querySelector('.fbt-name').textContent;
            this.textContent = 'Added!';
            this.style.backgroundColor = '#10B981';
            this.style.color = '#FFFFFF';

            setTimeout(() => {
                this.textContent = 'Add';
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 1500);
        });
    });

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqItems = document.querySelectorAll('.faq-item');

    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(function(otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ============================================
    // CATALOGUE BUTTON
    // ============================================
    const catalogueBtn = document.querySelector('.catalogue-btn');
    if (catalogueBtn) {
        catalogueBtn.addEventListener('click', function() {
            const emailInput = document.getElementById('catalogueEmail');
            if (emailInput && emailInput.value) {
                alert('Thank you! We will send the catalogue to: ' + emailInput.value);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // ============================================
    // DOWNLOAD POPUP MODAL
    // ============================================
    const downloadBtn = document.querySelector('.download-btn');
    const downloadPopup = document.getElementById('downloadPopup');
    const closePopup = document.getElementById('closePopup');

    // Open popup on download button click
    if (downloadBtn && downloadPopup) {
        downloadBtn.addEventListener('click', function() {
            downloadPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close popup on close button click
    if (closePopup && downloadPopup) {
        closePopup.addEventListener('click', function() {
            downloadPopup.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close popup on overlay click
    if (downloadPopup) {
        downloadPopup.addEventListener('click', function(e) {
            if (e.target === downloadPopup) {
                downloadPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close popup on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && downloadPopup && downloadPopup.classList.contains('active')) {
            downloadPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle popup form submission
    const popupDownloadForm = document.querySelector('.popup-download-form');
    if (popupDownloadForm) {
        popupDownloadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your download will start shortly.');
            if (downloadPopup) {
                downloadPopup.classList.remove('active');
                document.body.style.overflow = '';
            }
            this.reset();
        });
    }

    // ============================================
    // REQUEST QUOTE MODAL
    // ============================================
    const openQuoteModalBtn = document.getElementById('openQuoteModal');
    const requestQuoteModal = document.getElementById('requestQuoteModal');
    const closeQuoteModalBtn = document.getElementById('closeQuoteModal');
    const quoteForm = document.getElementById('quoteForm');

    // Open modal on "Request a Quote" button click
    if (openQuoteModalBtn && requestQuoteModal) {
        openQuoteModalBtn.addEventListener('click', function() {
            requestQuoteModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal on close button click
    if (closeQuoteModalBtn && requestQuoteModal) {
        closeQuoteModalBtn.addEventListener('click', function() {
            requestQuoteModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modal on overlay click
    if (requestQuoteModal) {
        requestQuoteModal.addEventListener('click', function(e) {
            if (e.target === requestQuoteModal) {
                requestQuoteModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && requestQuoteModal && requestQuoteModal.classList.contains('active')) {
            requestQuoteModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle quote form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will get back to you shortly.');
            if (requestQuoteModal) {
                requestQuoteModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            this.reset();
        });
    }

    // ============================================
    // APPLICATION CARDS INTERACTION
    // ============================================
    const applicationCards = document.querySelectorAll('.application-card');

    applicationCards.forEach(function(card) {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title').textContent;
            // Add a visual feedback
            this.style.transform = 'translateX(12px) scale(1.02)';

            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            // You can add navigation or modal functionality here
            console.log('Application clicked: ' + title);
        });
    });

    // ============================================
    // APPLICATIONS GRID NAVIGATION (Mobile Carousel)
    // ============================================
    const applicationsGrid = document.querySelector('.applications-grid');
    const appNavArrows = document.querySelectorAll('.applications-header-right .nav-arrow');

    if (applicationsGrid && appNavArrows.length > 0) {
        let currentAppCard = 0;
        const appCards = document.querySelectorAll('.application-card');

        function getVisibleCards() {
            const width = window.innerWidth;
            if (width <= 480) return 1;
            if (width <= 768) return 2;
            return 4;
        }

        function scrollToCard(index) {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, appCards.length - visibleCards);
            currentAppCard = Math.max(0, Math.min(index, maxIndex));

            const cardWidth = appCards[0].offsetWidth + 16; // card + gap
            applicationsGrid.scrollTo({
                left: currentAppCard * cardWidth,
                behavior: 'smooth'
            });
        }

        appNavArrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                const visibleCards = getVisibleCards();
                if (arrow.classList.contains('prev')) {
                    currentAppCard = Math.max(0, currentAppCard - 1);
                } else {
                    currentAppCard = Math.min(appCards.length - visibleCards, currentAppCard + 1);
                }
                scrollToCard(currentAppCard);
            });
        });
    }

    // ============================================
    // CONTACT FORM SUBMISSION
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Validate form
            if (name && email && message) {
                // Simulate form submission
                alert('Thank you, ' + name + '! Your message has been sent successfully. We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // ============================================
    // MANUFACTURING PROCESS TABS
    // ============================================
    const processTabs = document.querySelectorAll('.process-tab');
    const contentTitle = document.querySelector('.content-title');
    const contentDescription = document.querySelector('.content-description');
    const contentFeatures = document.querySelector('.content-features');

    // Process step data
    const processStepData = {
        1: {
            title: 'High-Grade Raw Material Selection',
            description: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.',
            features: ['PE100 grade material', 'Optimal molecular weight distribution']
        },
        2: {
            title: 'Precision Extrusion Process',
            description: 'Heated HDPE material is forced through a precision die, creating the pipe shape with consistent wall thickness throughout.',
            features: ['Temperature-controlled extrusion', 'Consistent material flow']
        },
        3: {
            title: 'Controlled Cooling System',
            description: 'Pipes pass through cooling tanks with precise temperature control to ensure proper crystallization and dimensional stability.',
            features: ['Optimized cooling rate', 'Enhanced material properties']
        },
        4: {
            title: 'Accurate Sizing & Calibration',
            description: 'Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.',
            features: ['Precise diameter control', 'Uniform wall thickness']
        },
        5: {
            title: 'Stringent Quality Control',
            description: 'Each pipe undergoes rigorous testing including dimensional checks, pressure testing, and visual inspection for defects.',
            features: ['ISO certified testing', '100% quality inspection']
        },
        6: {
            title: 'Product Marking & Identification',
            description: 'Pipes are clearly marked with important information including size, grade, standards, and manufacturing details.',
            features: ['Permanent marking', 'Standards compliance']
        },
        7: {
            title: 'Precision Cutting & Length Control',
            description: 'Pipes are cut to precise lengths using automated cutting systems ensuring clean, square cuts for proper joining.',
            features: ['Accurate length cutting', 'Clean edge finish']
        },
        8: {
            title: 'Secure Packaging & Storage',
            description: 'Finished pipes are carefully packaged and stored to protect from damage and maintain quality until delivery.',
            features: ['Protective packaging', 'Proper storage conditions']
        }
    };

    function updateProcessContent(stepNumber) {
        const data = processStepData[stepNumber];
        if (!data) return;

        // Animate out
        contentText = document.querySelector('.content-text');
        if (contentText) {
            contentText.style.opacity = '0';
            contentText.style.transform = 'translateY(10px)';
        }

        setTimeout(() => {
            // Update content
            if (contentTitle) contentTitle.textContent = data.title;
            if (contentDescription) contentDescription.textContent = data.description;

            if (contentFeatures) {
                contentFeatures.innerHTML = data.features.map(feature => `
                    <li>
                        <span class="bullet-dot"></span>
                        <span>${feature}</span>
                    </li>
                `).join('');
            }

            // Animate in
            if (contentText) {
                contentText.style.opacity = '1';
                contentText.style.transform = 'translateY(0)';
            }
        }, 200);
    }

    processTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            const stepNumber = this.getAttribute('data-step');

            // Update active tab
            processTabs.forEach(function(t) {
                t.classList.remove('active');
            });
            this.classList.add('active');

            // Update content
            updateProcessContent(stepNumber);
        });
    });

    // ============================================
    // MANUFACTURING NAVIGATION BUTTONS (Mobile)
    // ============================================
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.process-tab.active');
            if (activeTab) {
                const currentStep = parseInt(activeTab.getAttribute('data-step'));
                const prevStep = currentStep - 1;
                if (prevStep >= 1) {
                    const prevTab = document.querySelector(`.process-tab[data-step="${prevStep}"]`);
                    if (prevTab) {
                        processTabs.forEach(t => t.classList.remove('active'));
                        prevTab.classList.add('active');
                        updateProcessContent(prevStep);
                    }
                }
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const activeTab = document.querySelector('.process-tab.active');
            if (activeTab) {
                const currentStep = parseInt(activeTab.getAttribute('data-step'));
                const nextStep = currentStep + 1;
                if (nextStep <= 8) {
                    const nextTab = document.querySelector(`.process-tab[data-step="${nextStep}"]`);
                    if (nextTab) {
                        processTabs.forEach(t => t.classList.remove('active'));
                        nextTab.classList.add('active');
                        updateProcessContent(nextStep);
                    }
                }
            }
        });
    }

    // Add transition styles to content text
    const contentText = document.querySelector('.content-text');
    if (contentText) {
        contentText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // Initialize
    handleStickyHeader();

})();
