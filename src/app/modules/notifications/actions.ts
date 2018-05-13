// Copyright 2017 The genesis-front Authors
// This file is part of the genesis-front library.
// 
// The genesis-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The genesis-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the genesis-front library. If not, see <http://www.gnu.org/licenses/>.

import { INotification } from 'genesis/notifications';
import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('notifications');
export const enqueueNotification = actionCreator<INotification>('ENQUEUE_NOTIFICATION');
export const spawnNotification = actionCreator<INotification>('SPAWN_NOTIFICATION');
export const destroyNotification = actionCreator<string>('DESTROY_NOTIFICATION');
export const pushNotificationQueue = actionCreator<INotification>('PUSH_NOTIFICATION_QUEUE');