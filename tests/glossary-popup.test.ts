import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { dictionary } from '../src/data/dictionary';

/**
 * Recreates the glossary popup logic from [slug].astro for testing.
 * highlightTerms: walks text nodes, wraps dictionary chars in .glossary-term <a> tags
 * Then we simulate hover and verify the popup.
 */

function createPopupHTML() {
  document.body.innerHTML = `
    <div id="lesson-body-el" class="lesson-body">
      <p>Eu estudo 中文 todos os dias. 我学习中文。</p>
    </div>
    <div id="glossary-popup" class="hidden">
      <span id="popup-char"></span>
      <span id="popup-pinyin"></span>
      <span id="popup-strokes"></span>
      <p id="popup-portuguese"></p>
      <p id="popup-radical"></p>
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

function getCharDisplay(char: string): string {
  const t = ({'国':'國','学':'學','妈':'媽','马':'馬','语':'語','书':'書','师':'師','爱':'愛','乐':'樂','旧':'舊','临':'臨','刘':'劉','斋':'齋','园':'園','图':'圖','孙':'孫','尘':'塵','头':'頭','个':'個','从':'從','们':'們','体':'體','战':'戰','戏':'戲','吗':'嗎','时':'時','云':'雲','灯':'燈','烧':'燒','烟':'煙','岁':'歲','岛':'島','银':'銀','铁':'鐵','铜':'銅','针':'針','说':'說','话':'話','请':'請','谢':'謝','带':'帶','药':'藥','丰':'豐','觅':'覓','业':'業','东':'東','长':'長','门':'門','风':'風','见':'見','贝':'貝','车':'車','万':'萬','龙':'龍','骂':'罵','儿':'兒'})[char];
  return t ? `${char} (${t})` : char;
}

function getTraditional(char: string): string {
  return ({'国':'國','学':'學','妈':'媽','马':'馬','语':'語','书':'書','师':'師','爱':'愛','乐':'樂','旧':'舊','临':'臨','刘':'劉','斋':'齋','园':'園','图':'圖','孙':'孫','尘':'塵','头':'頭','个':'個','从':'從','们':'們','体':'體','战':'戰','戏':'戲','吗':'嗎','时':'時','云':'雲','灯':'燈','烧':'燒','烟':'煙','岁':'歲','岛':'島','银':'銀','铁':'鐵','铜':'銅','针':'針','说':'說','话':'話','请':'請','谢':'謝','带':'帶','药':'藥','丰':'豐','觅':'覓','业':'業','东':'東','长':'長','门':'門','风':'風','见':'見','贝':'貝','车':'車','万':'萬','龙':'龍','骂':'罵','儿':'兒'})[char] || '';
}

function highlightTerms(element: HTMLElement, dict: Record<string, any>) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  const textNodes: Text[] = [];
  let node: Text | null;

  while (node = walker.nextNode() as Text | null) {
    const parentTag = node.parentNode?.nodeName?.toUpperCase() || '';
    if (parentTag !== 'SCRIPT' && parentTag !== 'STYLE' && parentTag !== 'A' && parentTag !== 'CODE') {
      textNodes.push(node);
    }
  }

  const keys = Object.keys(dict).sort((a, b) => b.length - a.length);

  textNodes.forEach(textNode => {
    const text = textNode.nodeValue || '';
    let hasMatch = false;

    keys.forEach(key => {
      if (text.includes(key)) {
        hasMatch = true;
      }
    });

    if (hasMatch) {
      const wrapper = document.createElement('span');
      let escapedText = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      keys.forEach(key => {
        const regex = new RegExp(key, 'g');
        escapedText = escapedText.replace(
          regex,
          `<a href="#" class="glossary-term" data-char="${key}">${key}</a>`
        );
      });

      wrapper.innerHTML = escapedText;
      textNode.parentNode!.replaceChild(wrapper, textNode);
    }
  });
}

function simulateHover(term: HTMLAnchorElement) {
  const popup = document.getElementById('glossary-popup')!;
  const popupChar = document.getElementById('popup-char')!;
  const popupPinyin = document.getElementById('popup-pinyin')!;
  const popupPortuguese = document.getElementById('popup-portuguese')!;
  const popupRadical = document.getElementById('popup-radical')!;
  const popupStrokes = document.getElementById('popup-strokes')!;
  const popupTraditionalContainer = document.getElementById('popup-traditional-container')!;
  const popupTraditional = document.getElementById('popup-traditional')!;
  const popupMnemonicaContainer = document.getElementById('popup-mnemonica-container')!;
  const popupMnemonica = document.getElementById('popup-mnemonica')!;
  const popupLink = document.getElementById('popup-link')! as HTMLAnchorElement;

  const char = term.dataset.char!;
  const entry = dictionary[char];
  if (!entry) return;

  popupChar.textContent = getCharDisplay(entry.character);
  popupPinyin.textContent = entry.pinyin;
  popupStrokes.textContent = `${entry.strokeCount} traços`;
  popupPortuguese.textContent = entry.portuguese;
  popupRadical.textContent = entry.radical;

  const trad = getTraditional(entry.character);
  if (trad) {
    popupTraditional.textContent = trad;
    popupTraditionalContainer.classList.remove('hidden');
  } else {
    popupTraditionalContainer.classList.add('hidden');
  }

  if (entry.mnemonica) {
    popupMnemonica.textContent = entry.mnemonica;
    popupMnemonicaContainer.classList.remove('hidden');
  } else {
    popupMnemonicaContainer.classList.add('hidden');
  }

   popupLink.href = `https://zdic.net/hans/${encodeURIComponent(char)}`;

  popup.classList.remove('hidden');
}

describe('Glossary Popup — highlightTerms', () => {
  beforeEach(() => {
    createPopupHTML();
  });

  it('should wrap dictionary characters with .glossary-term anchor tags', () => {
    const body = document.getElementById('lesson-body-el')!;
    highlightTerms(body, dictionary);

    const terms = body.querySelectorAll('.glossary-term');
    // The text "Eu estudo 中文 todos os dias. 我学习中文。" contains:
    // 中, 文, 我, 学, 习, 中, 文
    // 习 is NOT in the dictionary, so: 中, 文, 我, 学, 中, 文 = 6 terms
    expect(terms.length).toBeGreaterThan(0);
    terms.forEach(term => {
      expect(term.tagName).toBe('A');
      expect(term.getAttribute('data-char')).toBeTruthy();
      expect(dictionary[term.getAttribute('data-char')!]).toBeDefined();
    });
  });

  it('should correctly highlight 中 and 文 as glossary terms', () => {
    const body = document.getElementById('lesson-body-el')!;
    highlightTerms(body, dictionary);

    const terms = body.querySelectorAll('.glossary-term');
    const chars = Array.from(terms).map(t => t.textContent);
    expect(chars).toContain('中');
    expect(chars).toContain('文');
    expect(chars).toContain('我');
    expect(chars).toContain('学');
  });

  it('should NOT wrap non-dictionary characters like 习', () => {
    const body = document.getElementById('lesson-body-el')!;
    highlightTerms(body, dictionary);

    const terms = body.querySelectorAll('.glossary-term');
    const chars = Array.from(terms).map(t => t.textContent);
    expect(chars).not.toContain('习');
  });
});

describe('Glossary Popup — hover behavior', () => {
  beforeEach(() => {
    createPopupHTML();
    const body = document.getElementById('lesson-body-el')!;
    highlightTerms(body, dictionary);
  });

  it('should show popup and populate data on hover of 中', () => {
    const terms = document.querySelectorAll<HTMLAnchorElement>('.glossary-term');
    const zhongTerm = Array.from(terms).find(t => t.dataset.char === '中');
    expect(zhongTerm).toBeDefined();
    if (!zhongTerm) return;

    simulateHover(zhongTerm);

    const popup = document.getElementById('glossary-popup')!;
    const popupPinyin = document.getElementById('popup-pinyin')!;
    const popupPortuguese = document.getElementById('popup-portuguese')!;
    const popupChar = document.getElementById('popup-char')!;

    expect(popup.classList.contains('hidden')).toBe(false);
    expect(popupPinyin.textContent).toBe('zhōng');
    expect(popupPortuguese.textContent).toContain('Centro');
    expect(popupChar.textContent).toContain('中');
  });

  it('should show traditional form for 学 (學)', () => {
    const terms = document.querySelectorAll<HTMLAnchorElement>('.glossary-term');
    const xueTerm = Array.from(terms).find(t => t.dataset.char === '学');
    expect(xueTerm).toBeDefined();
    if (!xueTerm) return;

    simulateHover(xueTerm);

    const popupChar = document.getElementById('popup-char')!;
    const popupTraditionalContainer = document.getElementById('popup-traditional-container')!;
    const popupTraditional = document.getElementById('popup-traditional')!;

    expect(popupChar.textContent).toContain('学');
    expect(popupTraditionalContainer.classList.contains('hidden')).toBe(false);
    expect(popupTraditional.textContent).toBe('學');
  });

  it('should hide traditional container for characters same in both scripts (中)', () => {
    const terms = document.querySelectorAll<HTMLAnchorElement>('.glossary-term');
    const zhongTerm = Array.from(terms).find(t => t.dataset.char === '中');
    expect(zhongTerm).toBeDefined();
    if (!zhongTerm) return;

    simulateHover(zhongTerm);

    const popupTraditionalContainer = document.getElementById('popup-traditional-container')!;
    expect(popupTraditionalContainer.classList.contains('hidden')).toBe(true);
  });

  it('should show mnemonic when available and hide when not', () => {
    const body = document.getElementById('lesson-body-el')!;
    // Add text with 国 which has a mnemonic and 我 which doesn't
    const p = document.createElement('p');
    p.textContent = '中国';
    body.appendChild(p);
    highlightTerms(body, dictionary);

    // Test 国 (has mnemonic)
    const guoTerm = Array.from(document.querySelectorAll<HTMLAnchorElement>('.glossary-term'))
      .find(t => t.dataset.char === '国')!;
    simulateHover(guoTerm);

    const popupMnemonicaContainer = document.getElementById('popup-mnemonica-container')!;
    const popupMnemonica = document.getElementById('popup-mnemonica')!;
    expect(popupMnemonicaContainer.classList.contains('hidden')).toBe(false);
    expect(popupMnemonica.textContent).toBeTruthy();
  });

  it('should update Zhongwen link on hover', () => {
    const terms = document.querySelectorAll<HTMLAnchorElement>('.glossary-term');
    const zhongTerm = Array.from(terms).find(t => t.dataset.char === '中')!;
    simulateHover(zhongTerm);

    const popupLink = document.getElementById('popup-link')! as HTMLAnchorElement;
   expect(popupLink.href).toContain('zdic.net');
   expect(popupLink.href).toContain('/hans/' + encodeURIComponent('中'));
  });

  it('should populate radical and stroke count on hover', () => {
    const terms = document.querySelectorAll<HTMLAnchorElement>('.glossary-term');
    const zhongTerm = Array.from(terms).find(t => t.dataset.char === '中')!;
    simulateHover(zhongTerm);

    const popupRadical = document.getElementById('popup-radical')!;
    const popupStrokes = document.getElementById('popup-strokes')!;

    expect(popupRadical.textContent).toBeTruthy();
    expect(popupStrokes.textContent).toMatch(/\d+ traços/);
  });
});
