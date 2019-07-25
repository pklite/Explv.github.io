'use strict';

import {Position} from './Position.js';

export class Area {

    constructor(startPosition, endPosition) {
        this.startPosition = startPosition;
        this.endPosition = endPosition;
        this.title = null;
    }


    static fromBounds(map, bounds) {
        return new Area(
            map,
            Position.fromLatLng(map, bounds.getSouthWest()),
            Position.fromLatLng(map, bounds.getNorthEast())
        );
    }


    setTitle(title) {
        this.title = title;
    }

    toLeaflet(map) {
        var newStartPosition = new Position(this.startPosition.x, this.startPosition.y, this.startPosition.z);
        var newEndPosition = new Position(this.endPosition.x, this.endPosition.y, this.startPosition.z);

        if (this.endPosition.x >= this.startPosition.x) {
            newEndPosition.x += 1;
        } else {
            newStartPosition.x += 1;
        }

        if (this.endPosition.y >= this.startPosition.y) {
            newEndPosition.y += 1;
        } else {
            newStartPosition.y += 1;
        }

        return L.rectangle(
            L.latLngBounds(
                newStartPosition.toLatLng(map),
                newEndPosition.toLatLng(map)
            ), {
                color: "#33b5e5",
                weight: 1,
                interactive: false
            }
        );
    }

    getName() {
        return "Area";
    }
}