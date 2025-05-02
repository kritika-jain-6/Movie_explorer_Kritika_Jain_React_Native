import asyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';
export default asyncStorageMock;
export const mockAsyncStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  mergeItem: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  flushGetRequests: jest.fn(),
};