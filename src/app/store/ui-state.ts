/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */

export interface UiState {
  userId: number;
  currentThreadId: number;
}

export const INITIAL_UI_STATE : UiState = {
  userId: 1,
  currentThreadId: undefined,

}
