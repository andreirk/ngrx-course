/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {AppState} from "../store/app-state";

export function mapStateToUserName (state:AppState): string {
  return  state.storeData.participants[state.uiState.userId].name
}
