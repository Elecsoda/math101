(function () {
    'use strict';

    var touchCapable = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    if (!touchCapable) return;

    document.documentElement.classList.add('math101-touch');

    var viewport = document.querySelector('meta[name="viewport"]');
    if (viewport && !/\bviewport-fit\s*=/.test(viewport.content)) {
        viewport.content += ', viewport-fit=cover';
    }

    var activeNumberInputs = new WeakSet();
    var adapterEvents = new WeakSet();
    var touchTarget = null;
    var touchTime = 0;

    function isNumberInput(node) {
        return node instanceof HTMLInputElement && node.type === 'number' && !node.disabled && !node.readOnly;
    }

    function prepareControl(control) {
        if (!(control instanceof HTMLElement)) return;

        if (isNumberInput(control)) {
            var step = control.getAttribute('step') || '';
            if (!control.hasAttribute('inputmode')) {
                var decimalHint = [step, control.value, control.getAttribute('min') || '', control.getAttribute('max') || '']
                    .some(function (value) { return value === 'any' || /[.,]/.test(value); });
                control.setAttribute('inputmode', decimalHint ? 'decimal' : 'numeric');
            }
            if (!control.hasAttribute('enterkeyhint')) control.setAttribute('enterkeyhint', 'done');
            control.setAttribute('autocomplete', 'off');
        }
    }

    function prepareTree(root) {
        if (root.nodeType !== 1) return;
        prepareControl(root);
        root.querySelectorAll('input, select, textarea, button, [role="button"]').forEach(prepareControl);
    }

    function keepIosFromZooming(input) {
        var size = parseFloat(getComputedStyle(input).fontSize);
        if (size < 16) input.style.fontSize = '16px';
    }

    function commitNumber(input) {
        if (!activeNumberInputs.has(input) || !input.isConnected) return;
        var event = new Event('input', { bubbles: true, composed: true });
        adapterEvents.add(event);
        input.dispatchEvent(event);
    }

    document.addEventListener('pointerdown', function (event) {
        if (event.pointerType === 'touch') {
            touchTarget = event.target;
            touchTime = Date.now();
        }
    }, true);

    document.addEventListener('touchstart', function (event) {
        touchTarget = event.target;
        touchTime = Date.now();
    }, { capture: true, passive: true });

    document.addEventListener('focusin', function (event) {
        var input = event.target;
        if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement)) return;

        keepIosFromZooming(input);
        if (!isNumberInput(input)) return;

        activeNumberInputs.add(input);

        /*
         * Controlled React number inputs in these tools often clamp every
         * intermediate value. Selecting the old value makes replacement easy,
         * while the input listener below lets a complete draft be typed first.
         */
        if (Date.now() - touchTime < 1000 && (touchTarget === input || input.contains(touchTarget))) {
            requestAnimationFrame(function () {
                if (document.activeElement !== input) return;
                try { input.select(); } catch (_) { /* number selection differs by WebKit version */ }
            });
        }
    }, true);

    document.addEventListener('input', function (event) {
        var input = event.target;
        if (!event.isTrusted || adapterEvents.has(event) || !isNumberInput(input) || !activeNumberInputs.has(input)) return;

        /*
         * Let WebKit update the visible draft, but postpone app-level onInput /
         * onChange handlers until blur or Enter. This prevents "" becoming a
         * clamped minimum before the user's next digit arrives.
         */
        event.stopImmediatePropagation();
    }, true);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && isNumberInput(event.target)) commitNumber(event.target);
    }, true);

    document.addEventListener('focusout', function (event) {
        var input = event.target;
        if (!isNumberInput(input)) return;
        commitNumber(input);
        activeNumberInputs.delete(input);
    }, true);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { prepareTree(document.documentElement); }, { once: true });
    } else {
        prepareTree(document.documentElement);
    }

    new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(prepareTree);
        });
    }).observe(document.documentElement, { childList: true, subtree: true });
}());
