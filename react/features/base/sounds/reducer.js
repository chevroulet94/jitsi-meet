// @flow
import {assign, ReducerRegistry} from '../redux';

import {
    _ADD_AUDIO_ELEMENT,
    _REMOVE_AUDIO_ELEMENT, REGISTER_SOUND, UNREGISTER_SOUND
} from './actionTypes';
import type { AudioElement } from '../media';

const logger = require('jitsi-meet-logger').getLogger(__filename);

type Sound = {
    audioElement?: AudioElement,
    soundId: String,
    src: Any
}

/**
 * Initial state of the sounds reducer which is a {@code Map} of globally stored
 * sounds.
 *
 * @type {Map<string, Sound>}
 */
const SOUNDS_INITIAL_STATE = new Map();

/**
 *
 */
ReducerRegistry.register(
'features/base/sounds', (state = SOUNDS_INITIAL_STATE, action) => {
    switch (action.type) {
    case _ADD_AUDIO_ELEMENT:
    case _REMOVE_AUDIO_ELEMENT: {
        return _addOrRemoveAudioElement(state, action);
    }
    case REGISTER_SOUND: {
        const newSoundsMap = new Map(state);

        // FIXME remove debug
        console.info(`REGISTER SOUND: ${action.soundId}`);

        newSoundsMap.set(action.soundId, {
            soundId: action.soundId,
            src: action.src
        });

        return newSoundsMap;
    }
    case UNREGISTER_SOUND: {
        const newSoundsMap = new Map(state);

        // FIXME remove debug
        console.info(`UNREGISTER SOUND: ${action.soundId}`);

        newSoundsMap.delete(action.soundId);

        return newSoundsMap;
    }
    default:
        return state;
    }
});

/**
 * FIXME.
 *
 * @param state
 * @param action
 * @return {Map<any, any>}
 * @private
 */
function _addOrRemoveAudioElement(state, action) {
    const isAddAction = action.type === _ADD_AUDIO_ELEMENT;
    const newSoundsMap = new Map(state);
    const { soundId } = action;

    const sound = newSoundsMap.get(soundId);

    if (sound) {
        if (isAddAction) {
            // FIXME remove debug
            logger.info(`ADD AUDIO ELEMENT ${soundId}`);

            newSoundsMap.set(soundId,
                assign(sound, {
                    audioElement: action.audioElement
                }));
        } else /* _REMOVE_AUDIO_ELEMENT */ {
            // FIXME remove debug
            logger.info(`REMOVE AUDIO ELEMENT ${soundId}`);

            newSoundsMap.set(soundId,
                assign(sound, {
                    audioElement: undefined
                }));
        }
    } else {
        const actionName
            = isAddAction
                ? '_ADD_AUDIO_ELEMENT' : '_REMOVE_AUDIO_ELEMENT';

        logger.error(`${actionName}: no sound for id: ${soundId}`);
    }

    return newSoundsMap;
}
