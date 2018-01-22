// @flow

import React, { Component } from 'react';

import { Audio } from '../../media';

import { connect } from 'react-redux';

import { Fragment } from '../../react';

import { _addAudioElement, _removeAudioElement } from '../actions';

/**
 * {@links BaseSoundsCollection}'s properties.
 */
type Props = {

    /**
     * Dispatches {@link ADD_AUDIO} Redux action which will store the
     * {@link AudioElement} from the Redux store.
     */
    _addAudioElement: Function,

    /**
     * Dispatches {@link REMOVE_AUDIO} Redux action which will remove the
     * {@link AudioElement} from the Redux store.
     */
    _removeAudioElement: Function,

    /**
     * FIXME.
     */
    _sounds: Map<String, *>
}

/**
 * Collections of all global sounds used by the app for playing audio
 * notifications in response to various events.
 */
class SoundsCollection extends Component<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const sounds = [];
        let key = 0;

        for (const [ soundId, sound ] of this.props._sounds.entries()) {
            sounds.push(
                React.createElement(
                    Audio, {
                        key,
                        setRef: this.setAudioElementImpl.bind(this, soundId),
                        src: sound.src
                    }));
            key += 1;
        }

        return (
            <Fragment>
                {
                    sounds
                }
            </Fragment>
        );
    }

    /**
     * Set the (reference to the) {@link AudioElement} object which implements
     * the audio playback functionality.
     *
     * @param {AudioElement} element - The {@link AudioElement} instance
     * which implements the audio playback functionality.
     * @protected
     * @returns {void}
     */
    setAudioElementImpl(soundId: string, element: ?AudioElement) {
        // AudioElements are stored only if both 'src' and 'audioId' properties
        // are present.
        if (element) {
            this.props._addAudioElement(soundId, element);
        } else {
            this.props._removeAudioElement(soundId);
        }
    }
}

/**
 * Maps (parts of) the Redux state to {@code SoundsCollection}'s props.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {{
 *     _sounds: Map
 * }}
 */
function _mapStateToProps(state) {
    return {
        /**
         * FIXME.
         *
         * @private
         * @type {Map}
         */
        _sounds: state['features/base/sounds']
    };
}

/**
 * Maps dispatching of some actions to React component props.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @returns {{
 *     _addAudioElement: void,
 *     _removeAudioElement: void
 * }}
 * @private
 */
export function _mapDispatchToProps(dispatch: Function) {
    return {
        /**
         * FIXME update
         * Dispatches action to store the {@link AudioElement} under
         * {@code audioId} in the Redux store, so that the playback can be
         * controlled through the Redux actions.
         *
         * @param {string} audioId - A global identifier which will be used to
         * identify the audio element instance.
         * @param {AudioElement} audioRef - The {@link AudioElement} instance
         * that will be stored in the Redux state of the base/media feature.
         * @returns {void}
         * @private
         */
        _addAudioElement(soundId: string, audioRef: AudioElement) {
            dispatch(_addAudioElement(soundId, audioRef));
        },

        /**
         * FIXME update
         * Dispatches action to remove {@link AudioElement} from the Redux
         * store.
         *
         * @param {string} audioId - The id of the {@link AudioElement} instance
         * to be removed from the Redux store.
         * @returns {void}
         * @private
         */
        _removeAudioElement(soundId: string) {
            dispatch(_removeAudioElement(soundId));
        }
    };
}

export default connect(_mapStateToProps, _mapDispatchToProps)(SoundsCollection);
