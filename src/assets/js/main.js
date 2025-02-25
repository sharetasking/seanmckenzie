// Add your javascript here

window.darkMode = false;

const stickyClasses = ["fixed", "h-14"];
const unstickyClasses = ["absolute", "h-20"];
const stickyClassesContainer = [
	"border-neutral-300/50",
	"bg-white/80",
	"dark:border-neutral-600/40",
	"dark:bg-neutral-900/60",
	"backdrop-blur-2xl",
];
const unstickyClassesContainer = ["border-transparent"];
let headerElement = null;

document.addEventListener("DOMContentLoaded", () => {
	headerElement = document.getElementById("header");

	// Check if dark mode is enabled
	if (document.documentElement.classList.contains('dark')) {
		window.darkMode = true;
	}
	
	stickyHeaderFuncionality();
	applyMenuItemClasses();
	evaluateHeaderPosition();
	mobileMenuFunctionality();
	
	// Initialize dark toggle if it exists (for backward compatibility)
	const darkToggle = document.getElementById("darkToggle");
	if (darkToggle) {
		darkToggle.addEventListener("click", () => {
			document.documentElement.classList.add("duration-300");

			if (document.documentElement.classList.contains("dark")) {
				localStorage.setItem("theme", "light");
				localStorage.setItem("dark_mode", false);
				showDay(true);
			} else {
				localStorage.setItem("theme", "dark");
				localStorage.setItem("dark_mode", true);
				showNight(true);
			}
		});
	}
	
	// Initialize lazy loading for GIFs
	initLazyLoadGifs();
	
	// Initialize lightbox if the function exists
	if (typeof window.initLightbox === 'function') {
		window.initLightbox();
	}
});

// Function to initialize lazy loading for GIFs using Intersection Observer
function initLazyLoadGifs() {
	// Immediately start loading all GIFs in the background
	document.querySelectorAll('.gif-image').forEach(img => {
		if (img.dataset.src) {
			// Create a new image object to load the GIF in the background
			const preloader = new Image();
			preloader.onload = () => {
				// Once the GIF is loaded in the background, update the visible image
				img.src = img.dataset.src;
				img.dataset.loaded = 'true';
				
				// Hide the loading placeholder
				const placeholder = img.parentElement.querySelector('.gif-loading-placeholder');
				if (placeholder) {
					placeholder.style.display = 'none';
				}
			};
			
			// Start loading the GIF
			preloader.src = img.dataset.src;
		}
	});
	
	// Still use Intersection Observer to prioritize visible GIFs
	if ('IntersectionObserver' in window) {
		const gifObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				// If the GIF is in the viewport, prioritize it
				if (entry.isIntersecting) {
					const container = entry.target;
					const img = container.querySelector('.gif-image');
					
					if (img && !img.dataset.prioritized) {
						// Mark as prioritized
						img.dataset.prioritized = 'true';
						
						// If not already loaded, load it immediately
						if (!img.dataset.loaded && img.dataset.src) {
							img.src = img.dataset.src;
							img.dataset.loaded = 'true';
							
							// When the GIF is loaded, hide the placeholder
							img.onload = () => {
								const placeholder = container.querySelector('.gif-loading-placeholder');
								if (placeholder) {
									placeholder.style.display = 'none';
								}
							};
						}
						
						// Stop observing this element
						observer.unobserve(container);
					}
				}
			});
		}, {
			root: null,
			rootMargin: '200px', // Larger margin to start prioritizing earlier
			threshold: 0.1
		});
		
		// Observe all GIF containers
		document.querySelectorAll('.relative.aspect-video').forEach(container => {
			gifObserver.observe(container);
		});
	}
}

// window.toggleDarkMode = function(){
//     document.documentElement.classList.toggle('dark');
//     if(document.documentElement.classList.contains('dark')){
//         localStorage.setItem('dark_mode', true);
//         window.darkMode = true;
//     } else {
//         window.darkMode = false;
//         localStorage.setItem('dark_mode', false);
//     }
// }

window.stickyHeaderFuncionality = () => {
	window.addEventListener("scroll", () => {
		evaluateHeaderPosition();
	});
};

window.evaluateHeaderPosition = () => {
	if (!headerElement) return;
	
	if (window.scrollY > 16) {
		headerElement.firstElementChild.classList.add(...stickyClassesContainer);
		headerElement.firstElementChild.classList.remove(
			...unstickyClassesContainer,
		);
		headerElement.classList.add(...stickyClasses);
		headerElement.classList.remove(...unstickyClasses);
		
		const menu = document.getElementById("menu");
		if (menu) {
			menu.classList.add("top-[56px]");
			menu.classList.remove("top-[75px]");
		}
	} else {
		headerElement.firstElementChild.classList.remove(...stickyClassesContainer);
		headerElement.firstElementChild.classList.add(...unstickyClassesContainer);
		headerElement.classList.add(...unstickyClasses);
		headerElement.classList.remove(...stickyClasses);
		
		const menu = document.getElementById("menu");
		if (menu) {
			menu.classList.remove("top-[56px]");
			menu.classList.add("top-[75px]");
		}
	}
};

function showDay(animate) {
	const sun = document.getElementById("sun");
	const moon = document.getElementById("moon");
	const dayText = document.getElementById("dayText");
	const nightText = document.getElementById("nightText");
	
	if (!sun || !moon || !dayText || !nightText) return;
	
	sun.classList.remove("setting");
	moon.classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;
		moon.classList.add("setting");
	}

	setTimeout(() => {
		dayText.classList.remove("hidden");
		nightText.classList.add("hidden");

		moon.classList.add("hidden");
		sun.classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.remove("dark");
			sun.classList.add("rising");
		}
	}, timeout);
}

function showNight(animate) {
	const sun = document.getElementById("sun");
	const moon = document.getElementById("moon");
	const dayText = document.getElementById("dayText");
	const nightText = document.getElementById("nightText");
	
	if (!sun || !moon || !dayText || !nightText) return;
	
	moon.classList.remove("setting");
	sun.classList.remove("rising");

	let timeout = 0;

	if (animate) {
		timeout = 500;
		sun.classList.add("setting");
	}

	setTimeout(() => {
		nightText.classList.remove("hidden");
		dayText.classList.add("hidden");

		sun.classList.add("hidden");
		moon.classList.remove("hidden");

		if (animate) {
			document.documentElement.classList.add("dark");
			moon.classList.add("rising");
		}
	}, timeout);
}

window.applyMenuItemClasses = () => {
	const menuItems = document.querySelectorAll("#menu a");
	for (let i = 0; i < menuItems.length; i++) {
		if (menuItems[i].pathname === window.location.pathname) {
			menuItems[i].classList.add("text-neutral-900", "dark:text-white");
		}
	}
	//:class="{ 'text-neutral-900 dark:text-white': window.location.pathname == '{menu.url}', 'text-neutral-700 dark:text-neutral-400': window.location.pathname != '{menu.url}' }"
};

function mobileMenuFunctionality() {
	const openMenu = document.getElementById("openMenu");
	const closeMenu = document.getElementById("closeMenu");
	
	if (openMenu) {
		openMenu.addEventListener("click", () => {
			openMobileMenu();
		});
	}

	if (closeMenu) {
		closeMenu.addEventListener("click", () => {
			closeMobileMenu();
		});
	}
}

window.openMobileMenu = () => {
	const openMenu = document.getElementById("openMenu");
	const closeMenu = document.getElementById("closeMenu");
	const menu = document.getElementById("menu");
	const mobileMenuBackground = document.getElementById("mobileMenuBackground");
	
	if (!openMenu || !closeMenu || !menu || !mobileMenuBackground) return;
	
	openMenu.classList.add("hidden");
	closeMenu.classList.remove("hidden");
	menu.classList.remove("hidden");
	mobileMenuBackground.classList.add("opacity-0");
	mobileMenuBackground.classList.remove("hidden");

	setTimeout(() => {
		mobileMenuBackground.classList.remove("opacity-0");
	}, 1);
};

window.closeMobileMenu = () => {
	const openMenu = document.getElementById("openMenu");
	const closeMenu = document.getElementById("closeMenu");
	const menu = document.getElementById("menu");
	const mobileMenuBackground = document.getElementById("mobileMenuBackground");
	
	if (!openMenu || !closeMenu || !menu || !mobileMenuBackground) return;
	
	closeMenu.classList.add("hidden");
	openMenu.classList.remove("hidden");
	menu.classList.add("hidden");
	mobileMenuBackground.classList.add("hidden");
};
