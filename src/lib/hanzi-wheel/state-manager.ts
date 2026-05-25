import type { WheelState, WheelStateData, WheelCategory } from './types';
import { buildGroups } from './config';

class HanziWheelStateManager {
  private data: WheelStateData = {
    state: 'idle',
    currentCategory: 'fase',
    currentGroup: '',
    centerCharacter: null,
    hoveredCharacter: null,
    selectedCharacter: null,
    orbitingCharacters: [],
  };

  getState(): WheelState { return this.data.state; }
  getData(): WheelStateData { return { ...this.data }; }

  init(): void {
    const groups = buildGroups('fase');
    if (groups.length > 0) {
      this.data.currentGroup = groups[0].id;
      this.data.orbitingCharacters = [...groups[0].characters].sort(() => Math.random() - 0.5);
      this.data.centerCharacter = this.data.orbitingCharacters[0] || null;
    }
  }

  switchCategory(category: WheelCategory): void {
    this.data.state = 'switching-category';
    this.emit('switching-category', { category });
    this.data.currentCategory = category;
    const groups = buildGroups(category);
    if (groups.length > 0) {
      this.data.currentGroup = groups[0].id;
      this.data.orbitingCharacters = [...groups[0].characters].sort(() => Math.random() - 0.5);
      this.data.centerCharacter = this.data.orbitingCharacters[0] || null;
    }
    this.data.state = 'idle';
    this.emit('category-change', { category, group: this.data.currentGroup });
  }

  switchGroup(groupId: string): void {
    this.data.currentGroup = groupId;
    const groups = buildGroups(this.data.currentCategory);
    const group = groups.find(g => g.id === groupId);
    if (group) {
      this.data.orbitingCharacters = [...group.characters].sort(() => Math.random() - 0.5);
      this.data.centerCharacter = this.data.orbitingCharacters[0] || null;
    }
    this.emit('group-change', { group: groupId });
  }

  hoverCharacter(character: string | null): void {
    this.data.hoveredCharacter = character;
    this.data.state = character ? 'hovering' : 'idle';
    this.emit('character-hover', { character });
  }

  selectCharacter(character: string): void {
    this.data.selectedCharacter = character;
    this.data.state = 'detail';
    this.emit('character-click', { character });
  }

  closeDetail(): void {
    this.data.selectedCharacter = null;
    this.data.state = 'idle';
    this.emit('close-detail', {});
  }

  private emit(event: string, detail: Record<string, unknown>): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(`hanzi-wheel:${event}`, { detail }));
    }
  }
}

export const stateManager = new HanziWheelStateManager();
