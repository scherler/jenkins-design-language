// @flow

import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import type Moment from 'moment';

type Props = {
    date: ?string,
    liveUpdate: ?boolean
};

type State = {
    date: ?Moment
};

/**
 * Displays a date in moment's "fromNow" format, e.g. "2 hours ago", "5 days ago" etc
 * Also displays the original date on hover.
 * Expects "date" to be passed in as ISO-8601 string with time zone info.
 * If time zone is omitted, then UTC is assumed.
 */
export class ReadableDate extends Component {

    state:State;
    timer:number;
    timerPeriodMillis:number;

    constructor(props:Props) {
        super(props);
        // When updating, average 1s period, with jitter to spread out the work
        this.timerPeriodMillis = 750 + Math.ceil(Math.random() * 500);
        this.timer = 0;
        this.state = {date: null};
    }

    componentWillMount() {
        this.handleProps(this.props);
    }

    componentWillReceiveProps(nextProps:Props) {
        this.handleProps(nextProps);
    }

    handleProps(props:Props) {

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
        }

        let date = null;

        if (props.date) {
            // enforce a ISO-8601 date and try to set proper timezone
            const aMoment = moment(props.date, moment.ISO_8601)
                .utcOffset(props.date);

            if (aMoment.isValid()) {
                // a moment has no name.
                date = aMoment;
            }
        }

        if (date && props.liveUpdate) {
            this.timer = setInterval(() => {
                this.forceUpdate();
            }, this.timerPeriodMillis);
        }

        this.setState({date});
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = 0;
        }
    }

    render() {
        const {date} = this.state;

        if (date) {
            const now = moment().utc();

            // only show the year if from different year
            let tooltip = date.year() !== now.year() ?
                date.format('MMM DD YYYY h:mma Z') :
                date.format('MMM DD h:mma Z');

            tooltip = tooltip.replace('+00:00', 'UTC');

            return (
                <time dateTime={this.props.date} title={tooltip}>{date.fromNow()}</time>
            );
        }

        return (<span>-</span>);
    }
}

ReadableDate.propTypes = {
    date: PropTypes.string,
    liveUpdate: PropTypes.bool,
};
