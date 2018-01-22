/* @flow */

import {
    _ADD_AUDIO_ELEMENT, _REMOVE_AUDIO_ELEMENT,
    PLAY_SOUND,
    REGISTER_SOUND,
    UNREGISTER_SOUND
} from './actionTypes';
import type {AudioElement} from '../media/components/AbstractAudio';

/**
 * Registers given {@link AudioElement} to the Redux store under given
 * identifier.
 *
 * @param {string} soundId - The global sound identifier.
 * @param {any} src - FIXME
 * @returns {{
 *     type: REGISTER_SOUND,
 *     soundId: string,
 *     src: any
 * }}
 */
export function registerSound(soundId: string, src: any): Object {
    return {
        type: REGISTER_SOUND,
        soundId,
        src
    };
}

/**
 * Removes the audio element from the Redux store identified by the given id.
 *
 * @param {string} soundId - The global audio element instance identifier.
 * @returns {{
 *     type: UNREGISTER_SOUND,
 *     soundId: string
 * }}
 */
export function unregisterSound(soundId: string): Object {
    return {
        type: UNREGISTER_SOUND,
        soundId
    };
}

export function playSound(soundId: string): Object {
    return {
        type: PLAY_SOUND,
        soundId
    };
}

export function _addAudioElement(soundId: string, audioElement: AudioElement) {
    return {
        type: _ADD_AUDIO_ELEMENT,
        soundId,
        audioElement
    };
}

export function _removeAudioElement(soundId: string) {
    return {
        type: _REMOVE_AUDIO_ELEMENT,
        soundId
    };
}
