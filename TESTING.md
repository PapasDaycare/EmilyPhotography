Accessibility & Visual Test Checklist

Quick manual test steps to verify recent changes (skip link + mobile nav toggle + focus outlines):

1) Skip link
   - Open any page and press <kbd>Tab</kbd> until you see "Skip to content".
   - Press <kbd>Enter</kbd>. Focus should jump to the element with `id="main"`.

2) Mobile nav
   - Resize the browser to a narrow width or use device emulation (e.g., Chrome/Firefox devtools).
   - Open the hamburger menu (click or press Enter on the burger). Links should appear.
   - Click a link — the menu should close. Press <kbd>Esc</kbd> with the menu open to close it.

3) Focus outlines
   - Tab through links, buttons, form fields — focus-visible outlines should be present and clear.

4) Lightbox keyboard
   - Open the gallery on `portfolio.html`, open an image, then use <kbd>ArrowLeft</kbd>, <kbd>ArrowRight</kbd>, and <kbd>Esc</kbd> to navigate/close.

5) Forms/iframes
   - Ensure the booking form iframe on `book.html` loads and has a `title` attribute for screen readers.

Notes:
- Use the included `accessibility-test.html` page to visually validate focus/focus order quickly.
- If anything fails, copy the failing step details and I can implement fixes.
