const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    // Verstecke den benutzerdefinierten Cursor für Touch-Geräte
    cursor.style.display = 'none';
} else {
// Function for cursor movement
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - cursor.offsetWidth / 2,  // Centers the cursor
        y: e.clientY - cursor.offsetHeight / 2,  // Centers the cursor
        duration: 0,  // As fast as possible
        ease: "none"
    });
});

// Capture interactive sections
const interactiveSections = document.querySelectorAll('#active');

// Show Custom Cursor only in specific sections
interactiveSections.forEach(section => {
    section.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';  // Show custom cursor
        cursor.classList.add('active');

        // Cursor grows when hovering over section
         // Cursor grows when hovering over section
        gsap.to(cursor, {
            width: 100,
            height: 100,
            duration: 0.3,
            ease: "power2.out"
         });
    });

    section.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';  // Hide custom cursor
        cursor.classList.remove('active');
       
    });
});

// Hide cursor outside interactive sections
document.addEventListener('mousemove', (e) => {
    const inInteractiveSection = Array.from(interactiveSections).some(section =>
        section.contains(e.target)
    );
    if (!inInteractiveSection) {
        cursor.style.display = 'none';  // Hide custom cursor
    }
});

}