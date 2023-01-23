import React from 'react';
import { render, fireEvent, screen, userEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

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



test('renders without errors', () => { 
    // console.log(showTestData);
    render(<Show show={showTestData} selectedSeason="none" />);
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show="" />);
    const loading = screen.getByTestId('loading-container');
    // console.log(loading);
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={showTestData} selectedSeason="none" />);
    const seasons = screen.getAllByTestId('season-option');
    expect(seasons).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => { 
    const handleSelect = jest.fn();
    render(<Show show={showTestData} selectedSeason={"none"} handleSelect={handleSelect} />);
    const select = screen.getByLabelText(/Select A Season/i);
     // console.log(select);
    // userEvent.selectOptions(select, ['2']);
    userEvent.selectOptions(screen.getByLabelText(/select a season/i), '0')

    expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={showTestData} selectedSeason="none" />);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();
    rerender(<Show show={showTestData} selectedSeason={1} />)
    episodes = screen.queryByTestId('episodes-container')
    expect(episodes).toBeInTheDocument();
});
