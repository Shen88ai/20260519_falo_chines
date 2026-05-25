export type DeviceTier = 'high' | 'medium' | 'low';

export type WheelCategory = 'tone' | 'radical' | 'topic' | 'fase';

export type WheelState =
  | 'idle'
  | 'hovering'
  | 'detail'
  | 'switching-category'
  | 'rotating';

export interface WheelStateData {
  state: WheelState;
  currentCategory: WheelCategory;
  currentGroup: string;
  centerCharacter: string | null;
  hoveredCharacter: string | null;
  selectedCharacter: string | null;
  orbitingCharacters: string[];
}

export interface WheelGroup {
  id: string;
  label: string;
  color: string;
  characters: string[];
}

export interface CategoryConfig {
  id: WheelCategory;
  label: string;
  icon: string;
  color: string;
}
