import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { EmptyStateView } from '../components/EmptyStateView';

storiesOf('EmptyStateView', module)
    .add('One-Liner', oneLiner)
    .add('Content & Wide Image', contentWithWideImage)
    .add('Content & Narrow Image', contentWithNarrowImage)
    .add('Content Only', contentOnly)
    .add('Image Only', imageOnly);

function oneLiner() {
    return (
        <EmptyStateView tightSpacing>
            <p>There are no artifacts for this pipeline run.</p>
        </EmptyStateView>
    );
}

function contentWithWideImage() {
    return (
        <EmptyStateView iconName="branch">
            {defaultContent()}
        </EmptyStateView>
    );
}

function contentWithNarrowImage() {
    return (
        <EmptyStateView iconName="goat">
            {defaultContent()}
        </EmptyStateView>
    );
}

function contentOnly() {
    return (
        <EmptyStateView>
            {defaultContent()}
        </EmptyStateView>
    );
}

function imageOnly() {
    return (
        <EmptyStateView iconName="shoes" />
    );
}

function defaultContent() {
    return (
        <div>
            <h1>Push me, pull you</h1>

            <p>
            When a Pull Request is opened on the repository Panther,
            Jenkins will test it and report the status of
            your changes back to the pull request on Github.
            </p>

            <button>Enable</button>
        </div>
    );
}


