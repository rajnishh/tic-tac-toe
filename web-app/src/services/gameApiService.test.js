import axios from 'axios';
import { makeMoveAPI, saveStatsAPI, getStatsAPI } from './gameApiService'; // Adjust the path if needed

// Mock axios
jest.mock('axios');

describe('Game API Service', () => {
  
  // Test for makeMoveAPI success
  it('should make a move successfully', async () => {
    const mockToken = 'mock-token';
    const mockBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const mockPlayer = 'X';
    const mockResponse = { data: { next_move: [0, 1], board: mockBoard, status: 'ongoing' } };

    axios.post.mockResolvedValue(mockResponse); // Mock successful response

    const result = await makeMoveAPI(mockBoard, mockPlayer, mockToken);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/game/move'),
      { board: mockBoard, player: mockPlayer },
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
    expect(result).toEqual(mockResponse.data);
  });

  // Test for makeMoveAPI error
  it('should handle an error during making a move', async () => {
    const mockToken = 'mock-token';
    const mockBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    const mockPlayer = 'X';
    const mockError = { response: { data: { error: 'Move failed' } } };

    axios.post.mockRejectedValue(mockError); // Mock error response

    await expect(makeMoveAPI(mockBoard, mockPlayer, mockToken)).rejects.toEqual(mockError.response.data);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/game/move'),
      { board: mockBoard, player: mockPlayer },
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
  });

  // Test for saveStatsAPI success
  it('should save stats successfully', async () => {
    const mockToken = 'mock-token';
    const mockUserId = '123';
    const mockWins = 5;
    const mockLosses = 2;
    const mockDraws = 1;
    const mockResponse = { data: { message: 'Stats saved successfully' } };

    axios.post.mockResolvedValue(mockResponse); // Mock successful response

    const result = await saveStatsAPI(mockUserId, mockWins, mockLosses, mockDraws, mockToken);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/game/stats'),
      { userId: mockUserId, wins: mockWins, losses: mockLosses, draws: mockDraws },
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
    expect(result).toEqual(mockResponse.data);
  });

  // Test for saveStatsAPI error
  it('should handle an error during saving stats', async () => {
    const mockToken = 'mock-token';
    const mockUserId = '123';
    const mockWins = 5;
    const mockLosses = 2;
    const mockDraws = 1;
    const mockError = { response: { data: { error: 'Stats save failed' } } };

    axios.post.mockRejectedValue(mockError); // Mock error response

    await expect(saveStatsAPI(mockUserId, mockWins, mockLosses, mockDraws, mockToken)).rejects.toEqual(mockError.response.data);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/game/stats'),
      { userId: mockUserId, wins: mockWins, losses: mockLosses, draws: mockDraws },
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
  });

  // Test for getStatsAPI success
  it('should retrieve stats successfully', async () => {
    const mockToken = 'mock-token';
    const mockResponse = { data: { wins: 5, losses: 2, draws: 1 } };

    axios.get.mockResolvedValue(mockResponse); // Mock successful response

    const result = await getStatsAPI(mockToken);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/game/stats'),
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
    expect(result).toEqual(mockResponse.data);
  });

  // Test for getStatsAPI error
  it('should handle an error during retrieving stats', async () => {
    const mockToken = 'mock-token';
    const mockError = { response: { data: { error: 'Stats retrieval failed' } } };

    axios.get.mockRejectedValue(mockError); // Mock error response

    await expect(getStatsAPI(mockToken)).rejects.toEqual(mockError.response.data);

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/game/stats'),
      { headers: { Authorization: `Bearer ${mockToken}` } }
    );
  });
});
