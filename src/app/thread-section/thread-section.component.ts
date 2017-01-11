import { Component, OnInit } from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import {Store} from "@ngrx/store";
import {AppState} from "../store/app-state";
import {LoadUserThreadsAction} from "../store/actions";
import {Observable} from "rxjs";
import {Thread} from "../../../shared/model/thread";
import * as _ from 'lodash'
import {ThreadSummaryVM} from "./thread-summary.vm";
import {mapStateToUserName} from "./mapStateToUserName";
import {mapStateToUnreadMessagesCounter} from "./mapStateToUnreadMessagesCounter";

@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadsSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private threadsService: ThreadsService,
              private store: Store<AppState>) {


    this.userName$ = store
                      .skip(1)
                      .map(mapStateToUserName);

    this.unreadMessagesCounter$ = store
                                    .skip(1)
                                    .map(mapStateToUnreadMessagesCounter)

    this.threadsSummaries$ = store.select(
      state => {

        const threads = _.values<Thread>(state.storeData.threads);

        return threads.map(
          thread => {

            const names = _.keys(thread.participants).map(participantId => state.storeData.participants[participantId].name)

            const lastMessageId = _.last(thread.messageIds),
              lastMessage = state.storeData.messages[lastMessageId]
            return {
              id: thread.id,
              participantNames: _.join(names, ', '),
              lastMessageText: state.storeData.messages[lastMessageId].text,
              timestamp: lastMessage.timestamp
            }
          }
        );
      }
    )

  }


  ngOnInit() {

        this.threadsService.loadUserThreads()
          .subscribe(
            allUserData => this.store.dispatch(
              new LoadUserThreadsAction(allUserData)
            )
          )

  }

}
