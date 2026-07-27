let currentPopup = null;

document.querySelectorAll('.grid-cell').forEach(cell => {
  
  cell.addEventListener('mouseenter', () => {
    // 1. Target the original local content
    const imgElement = cell.querySelector('.main-img');
    const textElement = cell.querySelector('.text-overlay');
    
    // 2. Compute positions for the halfway point
    const cellRect = cell.getBoundingClientRect();
    const targetX = (cellRect.left + cellRect.width / 2) + (window.innerWidth / 2 - (cellRect.left + cellRect.width / 2)) * 0.5;
    const targetY = (cellRect.top + cellRect.height / 2) + (window.innerHeight / 2 - (cellRect.top + cellRect.height / 2)) * 0.5;

    // 3. Generate the popup container HTML string on-the-fly
    const popup = document.createElement('div');
    popup.className = 'zoom-popup';
    popup.style.left = `${targetX}px`;
    popup.style.top = `${targetY}px`;

    // 4. Inject direct duplicates of the image URL, Alt text, and inner text
    popup.innerHTML = `
      <img src="${imgElement.src}" alt="${imgElement.alt}">
      <div class="zoom-caption">${textElement.textContent}</div>
    `;

    // 5. Render into the page DOM
    document.body.appendChild(popup);
    currentPopup = popup;

    // Trigger transition delay slightly after element insertion
    requestAnimationFrame(() => {
      popup.classList.add('active');
    });
  });

  cell.addEventListener('mouseleave', () => {
    if (currentPopup) {
      const targetToRemove = currentPopup;
      targetToRemove.classList.remove('active');
      
      // Wait for the fade-out CSS animation to finish before destroying node completely
      setTimeout(() => {
        targetToRemove.remove();
      }, 250); 
      
      currentPopup = null;
    }
  });
});
