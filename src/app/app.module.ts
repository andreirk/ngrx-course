///<reference path="../../node_modules/@types/lodash/index.d.ts"/>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';
import {ThreadsService} from "./services/threads.service";
import {StoreModule, Action} from "@ngrx/store";
import {INITIAL_APP_STATE, AppState} from "./store/app-state";
import {LOAD_USER_THREADS_ACTION, LoadUserThreadsAction} from "./store/actions";

import * as _ from 'lodash'
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

function storeReducer(state: AppState = INITIAL_APP_STATE, action: Action): AppState {
  switch (action.type){
    case LOAD_USER_THREADS_ACTION:
      return handleLoadUserThreadsAction(state, action)
    default:
      return state;
  }

}

function handleLoadUserThreadsAction(
    state:AppState,
    action: LoadUserThreadsAction
): AppState {

      const userData = action.payload;
      const newState: AppState = Object.assign({}, state);

      newState.storeData = {
        participants: _.keyBy(action.payload.participants, 'id'),
        messages: _.keyBy(action.payload.messages, 'id') ,
        threads: _.keyBy(action.payload.threads, 'id')
      };

      return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(storeReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
