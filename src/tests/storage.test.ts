// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import storage, { IStoredKey } from 'lib/storage';

class LocalStorageMock {
    store: {};

    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key: string) {
        return this.store[key] || null;
    }

    setItem(key: string, value: any) {
        this.store[key] = value.toString();
    }

    removeItem(key: string) {
        delete this.store[key];
    }
};

global['localStorage'] = new LocalStorageMock;

test('Storage saveAll/loadAll data equality', () => {
    const testData: IStoredKey[] = [
        {
            id: 'test_id1',
            encKey: 'test_encKey1',
            publicKey: 'test_publicKey1',
            address: 'test_address1'
        },
        {
            id: 'test_id2',
            encKey: 'test_encKey2',
            publicKey: 'test_publicKey2',
            address: 'test_address2'
        },
        {
            id: 'test_id3',
            encKey: 'test_encKey3',
            publicKey: 'test_publicKey3',
            address: 'test_address3'
        },
    ];
    storage.accounts.saveAll(testData);

    const loadedData = storage.accounts.loadAll();
    expect(loadedData).toMatchObject(testData);
});

test('Storage saveAll/load data equality', () => {
    const testData: IStoredKey[] = [
        {
            id: 'test_id1',
            encKey: 'test_encKey1',
            publicKey: 'test_publicKey1',
            address: 'test_address1'
        },
        {
            id: 'test_id2',
            encKey: 'test_encKey2',
            publicKey: 'test_publicKey2',
            address: 'test_address2'
        },
        {
            id: 'test_id3',
            encKey: 'test_encKey3',
            publicKey: 'test_publicKey3',
            address: 'test_address3'
        },
    ];
    storage.accounts.saveAll(testData);

    const loadedData = storage.accounts.load('test_id2');
    expect(loadedData).toMatchObject(testData[1]);
});

test('Storage save/loadAll data equality', () => {
    const testData: IStoredKey[] = [
        {
            id: 'test_id1',
            encKey: 'test_encKey1',
            publicKey: 'test_publicKey1',
            address: 'test_address1'
        },
        {
            id: 'test_id2',
            encKey: 'test_encKey2',
            publicKey: 'test_publicKey2',
            address: 'test_address2'
        },
        {
            id: 'test_id3',
            encKey: 'test_encKey3',
            publicKey: 'test_publicKey3',
            address: 'test_address3'
        },
    ];

    storage.accounts.save(testData[2]);
    storage.accounts.save(testData[1]);
    storage.accounts.save(testData[0]);

    const loadedData = storage.accounts.loadAll();
    expect(loadedData).toMatchObject(testData);
});

test('Storage save/load data equality', () => {
    const testData: IStoredKey[] = [
        {
            id: 'test_id1',
            encKey: 'test_encKey1',
            publicKey: 'test_publicKey1',
            address: 'test_address1'
        },
        {
            id: 'test_id2',
            encKey: 'test_encKey2',
            publicKey: 'test_publicKey2',
            address: 'test_address2'
        },
        {
            id: 'test_id3',
            encKey: 'test_encKey3',
            publicKey: 'test_publicKey3',
            address: 'test_address3'
        },
    ];

    storage.accounts.save(testData[2]);
    storage.accounts.save(testData[1]);
    storage.accounts.save(testData[0]);

    const loaded1 = storage.accounts.load('test_id1');
    const loaded2 = storage.accounts.load('test_id2');
    const loaded3 = storage.accounts.load('test_id3');

    expect(loaded1).toMatchObject(testData[0]);
    expect(loaded2).toMatchObject(testData[1]);
    expect(loaded3).toMatchObject(testData[2]);
});