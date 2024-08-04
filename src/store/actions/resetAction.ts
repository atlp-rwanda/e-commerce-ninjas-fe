export const RESET_STATE = 'RESET_STATE';
export const CLEAR_IMAGES = 'CLEAR_IMAGES';

export const clearImages = () => ({
  type: CLEAR_IMAGES,
});

export const resetState = () => ({
  type: RESET_STATE,
});
