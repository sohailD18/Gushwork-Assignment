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
    function handleStickyHeader() {
        const scrollY = window.pageYOffset;

        // Show sticky header when scrolled past main header
        if (scrollY > 80) {
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
    // HERO IMAGE CAROUSEL
    // ============================================
    const heroPrev = document.getElementById('heroPrev');
    const heroNext = document.getElementById('heroNext');
    const heroImage = document.getElementById('heroImage');

    // Sample images - replace with actual images
    const heroImages = [
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='350' viewBox='0 0 500 350'%3E%3Crect fill='%23f0f0f0' width='500' height='350'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EHDPE Pipes Product Image 1%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='350' viewBox='0 0 500 350'%3E%3Crect fill='%23e8e8e8' width='500' height='350'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EHDPE Pipes Product Image 2%3C/text%3E%3C/svg%3E",
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='350' viewBox='0 0 500 350'%3E%3Crect fill='%23d8d8d8' width='500' height='350'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3EHDPE Pipes Product Image 3%3C/text%3E%3C/svg%3E"
    ];

    let currentImageIndex = 0;

    function updateHeroImage() {
        heroImage.style.opacity = '0';
        setTimeout(function() {
            heroImage.src = heroImages[currentImageIndex];
            heroImage.style.opacity = '1';
        }, 200);
    }

    if (heroPrev) {
        heroPrev.addEventListener('click', function() {
            currentImageIndex--;
            if (currentImageIndex < 0) {
                currentImageIndex = heroImages.length - 1;
            }
            updateHeroImage();
        });
    }

    if (heroNext) {
        heroNext.addEventListener('click', function() {
            currentImageIndex++;
            if (currentImageIndex >= heroImages.length) {
                currentImageIndex = 0;
            }
            updateHeroImage();
        });
    }

    // Add transition to hero image
    if (heroImage) {
        heroImage.style.transition = 'opacity 0.2s ease';
    }

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
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
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

    // Add transition styles to content text
    const contentText = document.querySelector('.content-text');
    if (contentText) {
        contentText.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // Initialize
    handleStickyHeader();

})();
