import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useInfinitePokemon, useGetPokemon } from '@/hooks/api/pokemon/pokemon';
import Page1Screen from '@/app/page1';

jest.mock('@/hooks/api/pokemon/pokemon', () => ({
  useInfinitePokemon: jest.fn(),
  useGetPokemon: jest.fn(),
}));

describe('Page1Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Page1Screen and displays a list of Pokemon', async () => {
    const mockPokemonData = [
      { name: 'bulbasaur', sprites: { front_default: 'bulbasaur.png' } },
      { name: 'charmander', sprites: { front_default: 'charmander.png' } },
    ];

    (useInfinitePokemon as jest.Mock).mockReturnValue({
      data: {
        pages: [{ results: mockPokemonData }],
      },
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    (useGetPokemon as jest.Mock).mockReturnValue({ data: null });

    const { getByTestId, getByText, getAllByTestId } = render(<Page1Screen />);

    expect(getByTestId('page1-screen')).toBeTruthy();

    await waitFor(() => {
      const pokemonItems = getAllByTestId('pokemon-item');
      expect(pokemonItems.length).toBe(2);
    });

    expect(getByText('bulbasaur')).toBeTruthy();
    expect(getByText('charmander')).toBeTruthy();
  });

  it('handles search functionality', async () => {
    (useGetPokemon as jest.Mock).mockReturnValue({
      data: { name: 'pikachu', sprites: { front_default: 'pikachu.png' } },
    });

    const { getByPlaceholderText, getByText } = render(<Page1Screen />);

    const searchInput = getByPlaceholderText('Search');
    fireEvent.changeText(searchInput, 'pikachu');

    await waitFor(() => {
      expect(getByText('pikachu')).toBeTruthy();
    });
  });
});