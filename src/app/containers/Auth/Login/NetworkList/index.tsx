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

const mapStateToProps = (state: IRootState) => ({
    current: state.engine.guestSession && state.engine.guestSession.network,
    networks: state.storage.networks.sort((a, b) => a.uuid < b.uuid ? 1 : -1)
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