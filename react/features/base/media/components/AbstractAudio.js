// @flow

import { Component } from 'react';

import { addAudio, removeAudio } from '../actions';

/**
 * Describes audio element interface used in the base/media feature for audio
 * playback.
 */
export type AudioElement = {
    play: ?Function,
    pause: ?Function
}

/**
 * {@code AbstractAudio} component's property types.
 */
type Props = {

    /**
     * A callback which will be called with {@code AbstractAudio} instance once
     * the audio element is loaded.
     */
    setRef: ?Function,

    /**
     * The URL of a media resource to use in the element.
     *
     * @type {string}
     */
    src: Any,
    stream: Object
}

/**
 * The React {@link Component} which is similar to Web's
 * {@code HTMLAudioElement}.
 */
export default class AbstractAudio extends Component<Props> {
    /**
     * The {@link AudioElement} instance which implements the audio playback
     * functionality.
     */
    _audioElementImpl: ?AudioElement;

    setAudioElementImpl: Function;

    /**
     * Initializes a new {@code AbstractAudio} instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     */
    constructor(props: Object) {
        super(props);

        // Bind event handlers so they are only bound once for every instance.
        this.setAudioElementImpl = this.setAudioElementImpl.bind(this);
    }

    /**
     * Attempts to pause the playback of the media.
     *
     * @public
     * @returns {void}
     */
    pause() {
        this._audioElementImpl
            && typeof this._audioElementImpl.pause === 'function'
            && this._audioElementImpl.pause();
    }

    /**
     * Attempts to being the playback of the media.
     *
     * @public
     * @returns {void}
     */
    play() {
        this._audioElementImpl
            && typeof this._audioElementImpl.play === 'function'
            && this._audioElementImpl.play();
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
    setAudioElementImpl(element: ?AudioElement) {
        this._audioElementImpl = element;

        if (typeof this.props.setRef === 'function') {
            this.props.setRef(element ? this : null);
        }
    }
}
