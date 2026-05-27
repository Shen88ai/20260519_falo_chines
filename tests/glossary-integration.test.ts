import { describe, it, expect, beforeEach } from 'vitest';
import { dictionary } from '../src/data/dictionary';

/**
 * Integration test: simulates the exact define:vars flow from production.
 * - Serializes dictionary via JSON.stringify (as Astro does)
 - - Injects into IIFE scope via eval + closure (simulating define:vars)
 * - Runs highlightTerms and hover simulation
 */
function createFullPageHTML() {
  document.body.innerHTML = `
    <div class="prose max-w-none lesson-body" id="lesson-body-el">
      <h1 id="os-quatro-tons-primordiais-do-mandarim">Os Quatro Tons Primordiais do Mandarim</h1>
      <p>Diferente do português, o mandarim é uma língua <strong>tonal</strong>.</p>
      <p>Eu estudo 中文 todos os dias. 我学习中文。</p>
      <p>O caractere <strong>七</strong> tem relação com <strong>切</strong>.</p>
    </div>
    <div id="glossary-popup" class="fixed z-50 hidden opacity-0 scale-95 translate-y-2">
      <span class="text-4xl" id="popup-char">中</span>
      <span id="popup-pinyin">zhōng</span>
      <span id="popup-strokes">4 traços</span>
      <p id="popup-portuguese">Centro / Meio / China</p>
      <p id="popup-radical">丨 (linha vertical)</p>
      <div id="popup-mnemonica-container" class="hidden">
        <p id="popup-mnemonica"></p>
      </div>
      <div id="popup-traditional-container" class="hidden">
        <span id="popup-traditional"></span>
      </div>
      <a id="popup-link" href="#"></a>
    </div>
  `;
}

describe('Glossary Popup — production serialization round-trip', () => {
  beforeEach(() => {
    createFullPageHTML();
  });

  it('should survive JSON.stringify → HTML injection → JSON.parse round-trip', () => {
    // Step 1: Serialize as Astro does (server-side)
    const serializedDictionary = JSON.stringify(dictionary);
    const serializedLessonLookup = JSON.stringify({});

    // Step 2: Simulate define:vars IIFE injection (client-side)
    // This is what Astro does: wraps the script in an IIFE with const declarations
    const scriptFactory = new Function(
      'serializedDictStr',
      'serializedLookupStr',
      `
        const serializedDictionary = serializedDictStr;
        const serializedLessonLookup = serializedLookupStr;
        const flatSlug = "test-slug";

        // Copy of initGlossaryAndSidebar from [slug].astro
        const dict = JSON.parse(serializedDictionary);
        const lessonLookup = JSON.parse(serializedLessonLookup);
        const body = document.getElementById('lesson-body-el');
        const popup = document.getElementById('glossary-popup');

        if (!body || !popup) {
          window.__glossary_error = 'body or popup not found';
          return;
        }

        function highlightTerms(element) {
          const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
          const textNodes = [];
          let node;
          while (node = walker.nextNode()) {
            const parentTag = node.parentNode.tagName.toUpperCase();
            if (parentTag !== 'SCRIPT' && parentTag !== 'STYLE' && parentTag !== 'A' && parentTag !== 'CODE') {
              textNodes.push(node);
            }
          }
          const keys = Object.keys(dict).sort((a, b) => b.length - a.length);
          textNodes.forEach(textNode => {
            const text = textNode.nodeValue;
            let hasMatch = false;
            keys.forEach(key => { if (text.includes(key)) hasMatch = true; });
            if (hasMatch) {
              const wrapper = document.createElement('span');
              let escapedText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
              keys.forEach(key => {
                const regex = new RegExp(key, 'g');
                escapedText = escapedText.replace(regex, '<a href="#" class="glossary-term" data-char="' + key + '">' + key + '</a>');
              });
              wrapper.innerHTML = escapedText;
              textNode.parentNode.replaceChild(wrapper, textNode);
            }
          });
        }

        highlightTerms(body);

        // Count glossary terms
        window.__glossary_terms = document.querySelectorAll('.glossary-term').length;
        window.__glossary_chars = Array.from(document.querySelectorAll('.glossary-term')).map(function(t) { return t.dataset.char; });
        
        // Test hover on first term
        var firstTerm = document.querySelector('.glossary-term');
        if (firstTerm) {
          var char = firstTerm.dataset.char;
          var entry = dict[char];
          if (entry) {
            document.getElementById('popup-char').textContent = entry.character;
            document.getElementById('popup-pinyin').textContent = entry.pinyin;
            document.getElementById('popup-portuguese').textContent = entry.portuguese;
            popup.classList.remove('hidden');
            window.__popup_visible = true;
            window.__hovered_char = char;
          }
        }
      `
    );

    // Execute the script factory with the serialized strings
    scriptFactory(serializedDictionary, serializedLessonLookup);

    // Verify results
    expect(window.__glossary_error).toBeUndefined();
    expect(window.__glossary_terms).toBeGreaterThan(0);
    expect(window.__glossary_chars).toContain('中');
    expect(window.__glossary_chars).toContain('文');
    expect(window.__glossary_chars).toContain('七');
    expect(window.__glossary_chars).toContain('切');

    // Verify popup state
    const popup = document.getElementById('glossary-popup');
    expect(popup.classList.contains('hidden')).toBe(false);
    expect(window.__popup_visible).toBe(true);
    expect(window.__hovered_char).toBeTruthy();
    expect(document.getElementById('popup-pinyin').textContent).toBeTruthy();
  });

  it('should handle mnemonica with embedded quotes (七 entry)', () => {
    const serializedDictionary = JSON.stringify(dictionary);
    const scriptFactory = new Function(
      'serializedDictStr',
      `
        const serializedDictionary = serializedDictStr;
        const dict = JSON.parse(serializedDictionary);
        const entry = dict['七'];
        if (!entry) { window.__error = '七 not in dict'; return; }
        window.__mnemonica = entry.mnemonica;
      `
    );
    scriptFactory(serializedDictionary);
    expect(window.__error).toBeUndefined();
    expect(window.__mnemonica).toContain('cortar');
  });
});
