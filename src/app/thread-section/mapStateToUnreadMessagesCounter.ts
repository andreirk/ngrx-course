/*
 * Copyright © 2016 Aram Meem Company Limited.  All Rights Reserved.
 */
import {AppState} from "../store/app-state";
import {Thread} from "../../../shared/model/thread";
import * as _ from 'lodash'

export function mapStateToUnreadMessagesCounter(state:AppState): number {

  const currentUserId = state.uiState.userId;

  return _.values<Thread>(state.storeData.threads)
    .reduce(

      (acc, thread) => acc + thread.participants[currentUserId]

      ,0)
}
