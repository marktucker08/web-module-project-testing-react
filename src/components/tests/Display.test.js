import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow'
jest.mock('./../../api/fetchShow')

const showTestData = {
    name: "Brooklyn 99",
    summary: "A show about detectives in the 99 precinct",
    seasons: [ 
        {
            id: 0,
            name: "Season 1",
            episodes: []
        },
        {
            id: 1,
            name: "Season 2",
            episodes: []
        },
        {
            id: 2,
            name: "Season 3",
            episodes: []
        },
    ]
}

test('renders without errors with no props', async () => { 
    await render(<Display />);
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(showTestData);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(showTestData);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const seasons = screen.queryAllByTestId('season-option');
        expect(seasons).toHaveLength(3);
    })
});

test('test that the displayFunc is called when the fetch button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(showTestData);
    const displayFunc = jest.fn();
    render(<Display displayFunc={displayFunc} />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toHaveBeenCalled();
    })
});