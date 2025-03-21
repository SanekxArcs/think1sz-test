export interface UseDragAndDropOptions {
  onDrop?: (files: FileList) => void;
}

export interface UseDragAndDropResult {
  isDragging: boolean;
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
}

export interface UseRangeSliderOptions {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

export interface UseRangeSliderResult {
  showTooltip: boolean;
  isDragging: boolean;
  valueChanged: boolean;
  safePercentage: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}
