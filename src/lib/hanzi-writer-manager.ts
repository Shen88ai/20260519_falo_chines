export type Layer = 'watch' | 'practice' | 'master';

export interface ManagerOptions {
  width?: number;
  height?: number;
  padding?: number;
  strokeColor?: string;
  radicalColor?: string;
  showOutline?: boolean;
  showCharacter?: boolean;
  delayBetweenStrokes?: number;
  strokeAnimationSpeed?: number;
  showHintAfterMisses?: number | false;
  highlightOnComplete?: boolean;
}

export interface QuizCallbacks {
  onMistake?: (data: any) => void;
  onCorrectStroke?: (data: any) => void;
  onComplete?: (data: any) => void;
}

const DEFAULT_OPTIONS: ManagerOptions = {
  width: 200,
  height: 200,
  padding: 5,
  strokeColor: '#E74C3C',
  radicalColor: '#3498DB',
  showOutline: true,
  showCharacter: true,
  delayBetweenStrokes: 200,
  strokeAnimationSpeed: 1,
  showHintAfterMisses: 3,
  highlightOnComplete: true,
};

export class HanziWriterManager {
  private container: string | HTMLElement;
  private writer: any = null;
  private currentChar: string | null = null;
  private options: ManagerOptions;
  private currentLayer: Layer = 'watch';

  constructor(container: string | HTMLElement, options?: Partial<ManagerOptions>) {
    this.container = container;
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  loadCharacter(char: string): void {
    if (this.writer) {
      this.writer.setCharacter(char);
    } else {
      this.writer = (window as any).HanziWriter.create(this.container, char, this.options);
    }
    this.currentChar = char;
  }

  getCharacter(): string | null {
    return this.currentChar;
  }

  animate(options?: { onComplete?: () => void }): void {
    this.writer?.animateCharacter(options || {});
  }

  quiz(callbacks?: QuizCallbacks): void {
    this.writer?.quiz(callbacks || {});
  }

  loop(): void {
    this.writer?.loopCharacterAnimation();
  }

  pause(): void {
    this.writer?.pauseAnimation();
  }

  resume(): void {
    this.writer?.resumeAnimation();
  }

  cancelQuiz(): void {
    this.writer?.cancelQuiz();
  }

  animateStroke(strokeNum: number): void {
    this.writer?.animateStroke(strokeNum);
  }

  highlightStroke(strokeNum: number): void {
    this.writer?.highlightStroke(strokeNum);
  }

  showCharacter(): void {
    this.writer?.showCharacter();
  }

  hideCharacter(): void {
    this.writer?.hideCharacter();
  }

  showOutline(): void {
    this.writer?.showOutline();
  }

  hideOutline(): void {
    this.writer?.hideOutline();
  }

  updateColor(colorName: string, value: string): void {
    this.writer?.updateColor(colorName, value);
  }

  updateOptions(opts: Partial<ManagerOptions>): void {
    this.options = { ...this.options, ...opts };
  }

  getOptions(): ManagerOptions {
    return { ...this.options };
  }

  getLayer(): Layer {
    return this.currentLayer;
  }

  advanceLayer(): Layer {
    const layers: Layer[] = ['watch', 'practice', 'master'];
    const idx = layers.indexOf(this.currentLayer);
    if (idx < layers.length - 1) {
      this.currentLayer = layers[idx + 1];
    }
    return this.currentLayer;
  }

  resetLayer(): void {
    this.currentLayer = 'watch';
  }

  setLayer(layer: Layer): void {
    this.currentLayer = layer;
  }

  destroy(): void {
    this.writer = null;
    this.currentChar = null;
  }
}
