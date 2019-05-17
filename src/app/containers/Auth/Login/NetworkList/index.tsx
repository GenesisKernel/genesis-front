// MIT License
// 
// Copyright (c) 2016-2018 AplaProject
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { connect } from 'react-redux';
import { IRootState } from 'modules';
import { discoverNetwork, navigate } from 'modules/engine/actions';
import { INetwork } from 'apla/auth';

import NetworkList from 'components/Auth/Login/NetworkList';
import { modalShow } from 'modules/modal/actions';

const sortNetworks = (a: INetwork, b: INetwork) =>
    a.uuid < b.uuid ? 1 : -1;

const selectNetworks = (state: IRootState) => {
    const preconfiguredNetworks = state.storage.networks.filter(l =>
        !!state.engine.preconfiguredNetworks.find(n => n.uuid === l.uuid)
    ).sort(sortNetworks);

    const savedNetworks = state.storage.networks.filter(l =>
        !state.engine.preconfiguredNetworks.find(n => n.uuid === l.uuid)
    ).sort(sortNetworks);

    return {
        preconfiguredNetworks,
        networks: savedNetworks
    };
};

const mapStateToProps = (state: IRootState) => ({
    pending: state.engine.isConnecting,
    current: state.engine.guestSession && state.engine.guestSession.network,
    ...selectNetworks(state)
});

export default connect(mapStateToProps, {
    onConnect: (uuid: string) => discoverNetwork.started({ uuid }),
    onAddNetwork: () => navigate('/networks/add'),
    onRemove: (network: INetwork) => modalShow({
        id: 'REMOVE_NETWORK',
        type: 'REMOVE_NETWORK',
        params: {
            uuid: network.uuid,
            name: network.name
        }
    })

})(NetworkList);