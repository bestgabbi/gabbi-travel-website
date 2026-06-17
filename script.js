document.addEventListener('DOMContentLoaded', () => {
    let currentLang = 'zh';
    let currentCity = null;
    let currentGalleryPhotos = [];
    let currentPhotoIndex = 0;

    // Elements
    const mapPointsContainer = document.getElementById('map-points');
    const selectedCityEl = document.getElementById('selected-city');
    const selectedStatusEl = document.getElementById('selected-status');
    const selectedStoryEl = document.getElementById('selected-story');
    const selectedAlbumEl = document.getElementById('selected-photo-album');
    const visitedCountEl = document.getElementById('visited-count');
    const exploringCountEl = document.getElementById('exploring-count');
    const timelineListEl = document.getElementById('timeline-list');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryImg = document.getElementById('gallery-img');
    const galleryCounter = document.querySelector('.gallery-counter');

    // 1. Translation Function
    function updateLanguage(lang) {
        currentLang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[lang][key]) {
                el.textContent = i18n[lang][key];
            }
        });

        // Update Hero Intro specifically since it contains HTML
        const introContainer = document.getElementById('hero-intro-container');
        if (introContainer && i18n[lang].intro_text) {
            introContainer.innerHTML = i18n[lang].intro_text;
        }

        // Update active button
        document.querySelectorAll('.lang-button').forEach(btn => {
            btn.classList.toggle('is-active', btn.dataset.lang === lang);
        });

        // Update map panel if city selected
        if (currentCity) {
            renderCityPanel(currentCity);
        }
        
        // Update timeline
        renderTimeline();
    }

    // 2. Map & Cities
    function renderMap() {
        mapPointsContainer.innerHTML = '';
        cities.forEach(city => {
            const marker = document.createElement('button');
            marker.className = `city-marker ${city.status}`;
            marker.style.left = city.coords.left;
            marker.style.top = city.coords.top;
            marker.title = city.name;
            marker.onclick = () => selectCity(city);
            mapPointsContainer.appendChild(marker);
        });

        // Update counts
        visitedCountEl.textContent = cities.filter(c => c.status === 'visited' || c.status === 'base').length;
        exploringCountEl.textContent = '♾️';
    }

    function selectCity(city) {
        currentCity = city;
        renderCityPanel(city);
    }

    function renderCityPanel(city) {
        selectedCityEl.textContent = city.name;
        // Use translation keys for status
        const statusKey = `status_${city.status}`;
        selectedStatusEl.textContent = i18n[currentLang][statusKey] || city.status;
        selectedStatusEl.className = `place-status ${city.status}`;
        selectedStoryEl.textContent = city.story;

        selectedAlbumEl.innerHTML = '';
        if (city.photos.length > 0) {
            // Show main photo
            const mainImg = document.createElement('img');
            mainImg.src = city.photos[0];
            mainImg.className = 'main-photo';
            mainImg.onclick = () => openGallery(city.photos, 0);
            selectedAlbumEl.appendChild(mainImg);
            
            // Show thumbnails if there are more photos
            if (city.photos.length > 1) {
                const thumbnailsDiv = document.createElement('div');
                thumbnailsDiv.className = 'thumbnails';
                
                city.photos.slice(1, 5).forEach((photo, idx) => {
                    const img = document.createElement('img');
                    img.src = photo;
                    img.onclick = () => openGallery(city.photos, idx + 1);
                    thumbnailsDiv.appendChild(img);
                });
                
                // Add placeholder for photo count if needed
                if (city.photos.length > 5) {
                    const countSpan = document.createElement('span');
                    countSpan.style.cssText = 'display:flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:6px;border:2px solid #333;background:#ffdde2;font-size:0.8rem;font-weight:800;color:#333;';
                    countSpan.textContent = `${city.photos.length - 4} photos`;
                    thumbnailsDiv.appendChild(countSpan);
                }
                
                selectedAlbumEl.appendChild(thumbnailsDiv);
            }
        }
    }

    // 3. Timeline
    function renderTimeline() {
        timelineListEl.innerHTML = '';
        timeline.forEach(item => {
            const article = document.createElement('article');
            article.className = 'timeline-item';
            const statusLabel = i18n[currentLang].timeline_status || "Status";
            const needLabel = i18n[currentLang].timeline_need || "Need";
            const activityLabel = i18n[currentLang].timeline_activity || "Activity";
            
            // Get translated values
            const cityValue = i18n[currentLang][item.cityKey] || item.city;
            const statusValue = i18n[currentLang][item.statusKey] || item.status;
            const needValue = i18n[currentLang][item.needKey] || item.need;
            const activityValue = i18n[currentLang][item.activityKey] || item.activity;
            
            // Use date based on language
            const dateValue = currentLang === 'en' ? item.dateEn : item.dateZh;

            article.innerHTML = `
                <span class="timeline-date">${dateValue}</span>
                <h3>${cityValue}</h3>
                <p>${statusLabel}：${statusValue} · ${needLabel}：${needValue}</p>
                <p>${activityLabel}：${activityValue}</p>
            `;
            timelineListEl.appendChild(article);
        });
    }

    // 4. Gallery Modal
    function openGallery(photos, index) {
        currentGalleryPhotos = photos;
        currentPhotoIndex = index;
        updateGallery();
        galleryModal.classList.add('is-active');
    }

    function updateGallery() {
        galleryImg.src = currentGalleryPhotos[currentPhotoIndex];
        galleryCounter.textContent = `${currentPhotoIndex + 1} / ${currentGalleryPhotos.length}`;
    }

    document.querySelector('.gallery-nav.prev').onclick = () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + currentGalleryPhotos.length) % currentGalleryPhotos.length;
        updateGallery();
    };

    document.querySelector('.gallery-nav.next').onclick = () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % currentGalleryPhotos.length;
        updateGallery();
    };

    document.querySelector('.modal-close').onclick = () => galleryModal.classList.remove('is-active');
    document.querySelector('.modal-backdrop').onclick = () => galleryModal.classList.remove('is-active');

    // 5. Initializations
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.onclick = () => updateLanguage(btn.dataset.lang);
    });

    renderMap();
    renderTimeline();
    if (cities.length > 0) selectCity(cities[0]);

    // Simple Zoom simulation
    let scale = 1;
    document.querySelector('[data-action="zoom-in"]').onclick = () => {
        scale += 0.1;
        document.getElementById('map-canvas').style.transform = `scale(${scale})`;
    };
    document.querySelector('[data-action="zoom-out"]').onclick = () => {
        scale = Math.max(1, scale - 0.1);
        document.getElementById('map-canvas').style.transform = `scale(${scale})`;
    };
    document.querySelector('[data-action="reset"]').onclick = () => {
        scale = 1;
        document.getElementById('map-canvas').style.transform = `scale(1)`;
    };
});
