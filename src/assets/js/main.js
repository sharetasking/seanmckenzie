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
});

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
