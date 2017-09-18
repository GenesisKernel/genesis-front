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

import Keyring from 'lib/keyring';

const MOCK_PASSWORD = '12345678';
const MOCK_PUBLIC_KEY = '042e3077c513f3e2b7eaaeafb6ac299db932316e3b89fdcdde2eb0b524754b7a6893f5e11dfdba96ac47bf57e53e5fe46b958843cf54037b647b5abd7fa4403b97';
const MOCK_ENCRYPTED_KEY = 'U2FsdGVkX19bpEaxxr9ZVpY05Iikcm1vgZsLWHNTv1dlUzqPpq9uKSOlc9z5PGMsKi12io/x7LFvAnXQSvOPCeWLTqKZGofMoZJGHqTUQ16gr2d1i/ZWuEUo0KGNWoBL';

test('new Keyring with valid parameters', () => {
    const keyring = new Keyring(MOCK_PASSWORD, MOCK_PUBLIC_KEY, MOCK_ENCRYPTED_KEY);
    expect(keyring).toBeDefined();
});

test('Keyring verification', () => {
    const keyring = new Keyring(MOCK_PASSWORD, MOCK_PUBLIC_KEY, MOCK_ENCRYPTED_KEY);
    const result = keyring.verify('test case #1');
    expect(result).toBe(true);
});

test('Keyring verification with invalid password', () => {
    const keyring = new Keyring('', MOCK_PUBLIC_KEY, MOCK_ENCRYPTED_KEY);
    const result = keyring.verify('test case #1');
    expect(result).toBe(false);
});

test('Keyring verification with invalid key', () => {
    const keyring = new Keyring('', '12345678', '12345678');
    const result = keyring.verify('test case #1');
    expect(result).toBe(false);
});