import { describe, it, expect, beforeEach, vi } from 'vitest';

let writer: Record<string, any>;

function mockHanziWriter() {
  writer = {
    animateCharacter: vi.fn(),
    quiz: vi.fn(),
    loopCharacterAnimation: vi.fn(),
    setCharacter: vi.fn(),
    showCharacter: vi.fn(),
    hideCharacter: vi.fn(),
    showOutline: vi.fn(),
    hideOutline: vi.fn(),
    updateColor: vi.fn(),
    cancelQuiz: vi.fn(),
    pauseAnimation: vi.fn(),
    resumeAnimation: vi.fn(),
    animateStroke: vi.fn(),
    highlightStroke: vi.fn(),
  };
  vi.stubGlobal('HanziWriter', {
    create: vi.fn(() => writer),
  });
  return writer;
}

describe('HanziWriterManager', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('should create a writer via HanziWriter.create when loadCharacter is called', async () => {
    mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');

    manager.loadCharacter('中');

    expect(window.HanziWriter.create).toHaveBeenCalledWith('target-div', '中', expect.objectContaining({
      width: 200,
      height: 200,
    }));
    expect(manager.getCharacter()).toBe('中');
  });

  it('should return null character before any loadCharacter call', async () => {
    mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');

    expect(manager.getCharacter()).toBeNull();
  });

  it('should reuse same writer instance when loadCharacter is called again', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');

    manager.loadCharacter('中');
    manager.loadCharacter('国');

    expect(window.HanziWriter.create).toHaveBeenCalledTimes(1);
    expect(mockWriter.setCharacter).toHaveBeenCalledWith('国');
    expect(manager.getCharacter()).toBe('国');
  });

  it('should delegate animateCharacter to the writer', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');
    manager.loadCharacter('中');

    manager.animate();

    expect(mockWriter.animateCharacter).toHaveBeenCalledOnce();
  });

  it('should delegate quiz to the writer', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');
    manager.loadCharacter('中');

    manager.quiz({ onComplete: vi.fn() });

    expect(mockWriter.quiz).toHaveBeenCalledWith({ onComplete: expect.any(Function) });
  });

  it('should delegate loop to the writer', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');
    manager.loadCharacter('中');

    manager.loop();

    expect(mockWriter.loopCharacterAnimation).toHaveBeenCalledOnce();
  });

  it('should delegate pause/resume to the writer', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');
    manager.loadCharacter('中');

    manager.pause();
    expect(mockWriter.pauseAnimation).toHaveBeenCalledOnce();

    manager.resume();
    expect(mockWriter.resumeAnimation).toHaveBeenCalledOnce();
  });

  it('should delegate show/hideCharacter to the writer', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');
    manager.loadCharacter('中');

    manager.hideCharacter();
    expect(mockWriter.hideCharacter).toHaveBeenCalledOnce();

    manager.showCharacter();
    expect(mockWriter.showCharacter).toHaveBeenCalledOnce();
  });

  it('should delegate show/hideOutline to the writer', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');
    manager.loadCharacter('中');

    manager.hideOutline();
    expect(mockWriter.hideOutline).toHaveBeenCalledOnce();

    manager.showOutline();
    expect(mockWriter.showOutline).toHaveBeenCalledOnce();
  });

  it('should delegate updateColor to the writer', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');
    manager.loadCharacter('中');

    manager.updateColor('strokeColor', '#FF0000');

    expect(mockWriter.updateColor).toHaveBeenCalledWith('strokeColor', '#FF0000');
  });

  it('should delegate cancelQuiz, animateStroke, highlightStroke', async () => {
    const mockWriter = mockHanziWriter();
    const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
    const manager = new HanziWriterManager('target-div');
    manager.loadCharacter('中');

    manager.cancelQuiz();
    expect(mockWriter.cancelQuiz).toHaveBeenCalledOnce();

    manager.animateStroke(2);
    expect(mockWriter.animateStroke).toHaveBeenCalledWith(2);

    manager.highlightStroke(1);
    expect(mockWriter.highlightStroke).toHaveBeenCalledWith(1);
  });

  describe('Layer progression', () => {
    it('should start at watch layer', async () => {
      mockHanziWriter();
      const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
      const manager = new HanziWriterManager('target-div');

      expect(manager.getLayer()).toBe('watch');
    });

    it('should advance from watch to practice', async () => {
      mockHanziWriter();
      const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
      const manager = new HanziWriterManager('target-div');

      manager.advanceLayer();
      expect(manager.getLayer()).toBe('practice');
    });

    it('should advance from practice to master', async () => {
      mockHanziWriter();
      const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
      const manager = new HanziWriterManager('target-div');

      manager.advanceLayer();
      manager.advanceLayer();
      expect(manager.getLayer()).toBe('master');
    });

    it('should not advance beyond master', async () => {
      mockHanziWriter();
      const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
      const manager = new HanziWriterManager('target-div');

      manager.advanceLayer();
      manager.advanceLayer();
      const result = manager.advanceLayer();
      expect(manager.getLayer()).toBe('master');
      expect(result).toBe('master');
    });

    it('should reset to watch from any layer', async () => {
      mockHanziWriter();
      const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
      const manager = new HanziWriterManager('target-div');

      manager.advanceLayer();
      manager.advanceLayer();
      manager.resetLayer();
      expect(manager.getLayer()).toBe('watch');
    });

    it('should setLayer to any valid layer', async () => {
      mockHanziWriter();
      const { HanziWriterManager } = await import('../src/lib/hanzi-writer-manager');
      const manager = new HanziWriterManager('target-div');

      manager.setLayer('master');
      expect(manager.getLayer()).toBe('master');
    });
  });
});
