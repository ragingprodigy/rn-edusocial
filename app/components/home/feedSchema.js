/**
 * Created by oladapo on 14/10/2016.
 * @flow
 */
'use strict';
export type NewsFeed = {
  id: string,
  "_id": number,
  actor_type: string,
  actor_hash: string,
  actor_title: string,
  description: string,
  receiver_title: string,
  receiver_type: string,
  receiver_hash: string,
  school: string,
  "__v": number,
  date: number,
  likes: [string],
  tag: string
};