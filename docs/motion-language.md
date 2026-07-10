# Motion language

Motion should make the publication easier to enter, scan, and navigate without competing with its content.

## Principles

1. Reveal by reading order. Hero labels, headline, explanation, and actions enter once with short staggered offsets.
2. Confirm hierarchy. Section introductions and grouped evidence blocks reveal together as they approach the viewport.
3. Keep geometry stable. Motion uses opacity and transforms only; layout dimensions are final before animation starts.
4. Prefer stillness. No pointer chase, scroll hijack, marquee, spring motion, or continuously animated cards.
5. Preserve the source. Motion enhances the audited DOM and content without rewriting editorial wording or links.

## Tokens

- Quick feedback: 160–220ms, ease-out.
- Section reveal: 520–620ms, `cubic-bezier(0.22,1,0.36,1)`.
- Hero reveal: 760ms with 70–80ms reading-order offsets.
- Ambient hero grid: 18s alternate cycle, transform/opacity only, no data meaning.
- Section stagger: 55ms, capped at four offsets.

## Triggers and stable states

- Hero reveal starts after hydration and completes once.
- Sections use `IntersectionObserver`, an 8% threshold, and a -10% lower root margin. Each target is unobserved after its first reveal.
- Hover lift applies only where hover and fine-pointer capabilities exist.
- No essential information depends on animation or JavaScript. Server-rendered content is visible by default.

## Reduced motion

When `prefers-reduced-motion: reduce` is active, the client marks the page `data-motion="reduced"`, skips observers, disables smooth scrolling, and collapses animations/transitions to a single 0.01ms frame. All content remains immediately visible.

## Performance constraints

- No animation library is installed; CSS and one small client observer are sufficient.
- Only opacity and transform animate.
- The observer disconnects on unmount and stops observing revealed items.
- No offscreen canvas, video, or continuous JavaScript work runs.

