import { calculateMBTI } from './calculateMBTI';

describe('calculateMBTI', () => {
  test('should calculate MBTI type correctly for E type', () => {
    const answers = {
      1: 5, // E
      2: 1, // I
      3: 5, // E
      4: 1, // I
      5: 3, // S
      6: 3, // N
      7: 3, // S
      8: 3, // N
      9: 3, // T
      10: 3, // F
      11: 3, // T
      12: 3, // F
      13: 3, // J
      14: 3, // P
      15: 3, // J
      16: 3, // P
      17: 5, // E
      18: 1, // I
      19: 3, // N
      20: 3, // S
      21: 3, // T
      22: 3, // F
      23: 3, // J
      24: 3, // P
      25: 5, // E
      26: 1, // I
      27: 3, // S
      28: 3, // N
      29: 3, // T
      30: 3, // F
      31: 3, // J
      32: 3, // P
      33: 5, // E
      34: 1, // I
      35: 3, // S
      36: 3, // N
      37: 3, // T
      38: 3, // F
      39: 3, // J
      40: 3, // P
    };
    
    const result = calculateMBTI('quick', answers);
    expect(result.type.charAt(0)).toBe('E');
  });
  
  test('should calculate MBTI type correctly for I type', () => {
    const answers = {
      1: 1, // E
      2: 5, // I
      3: 1, // E
      4: 5, // I
      5: 3, // S
      6: 3, // N
      7: 3, // S
      8: 3, // N
      9: 3, // T
      10: 3, // F
      11: 3, // T
      12: 3, // F
      13: 3, // J
      14: 3, // P
      15: 3, // J
      16: 3, // P
      17: 1, // E
      18: 5, // I
      19: 3, // N
      20: 3, // S
      21: 3, // T
      22: 3, // F
      23: 3, // J
      24: 3, // P
      25: 1, // E
      26: 5, // I
      27: 3, // S
      28: 3, // N
      29: 3, // T
      30: 3, // F
      31: 3, // J
      32: 3, // P
      33: 1, // E
      34: 5, // I
      35: 3, // S
      36: 3, // N
      37: 3, // T
      38: 3, // F
      39: 3, // J
      40: 3, // P
    };
    
    const result = calculateMBTI('quick', answers);
    expect(result.type.charAt(0)).toBe('I');
  });
  
  test('should calculate MBTI type correctly for S type', () => {
    const answers = {
      1: 3, // E
      2: 3, // I
      3: 3, // E
      4: 3, // I
      5: 5, // S
      6: 1, // N
      7: 5, // S
      8: 1, // N
      9: 3, // T
      10: 3, // F
      11: 3, // T
      12: 3, // F
      13: 3, // J
      14: 3, // P
      15: 3, // J
      16: 3, // P
      17: 3, // E
      18: 3, // I
      19: 1, // N
      20: 5, // S
      21: 3, // T
      22: 3, // F
      23: 3, // J
      24: 3, // P
      25: 3, // E
      26: 3, // I
      27: 5, // S
      28: 1, // N
      29: 3, // T
      30: 3, // F
      31: 3, // J
      32: 3, // P
      33: 3, // E
      34: 3, // I
      35: 5, // S
      36: 1, // N
      37: 3, // T
      38: 3, // F
      39: 3, // J
      40: 3, // P
    };
    
    const result = calculateMBTI('quick', answers);
    expect(result.type.charAt(1)).toBe('S');
  });
  
  test('should calculate MBTI type correctly for N type', () => {
    const answers = {
      1: 3, // E
      2: 3, // I
      3: 3, // E
      4: 3, // I
      5: 1, // S
      6: 5, // N
      7: 1, // S
      8: 5, // N
      9: 3, // T
      10: 3, // F
      11: 3, // T
      12: 3, // F
      13: 3, // J
      14: 3, // P
      15: 3, // J
      16: 3, // P
      17: 3, // E
      18: 3, // I
      19: 5, // N
      20: 1, // S
      21: 3, // T
      22: 3, // F
      23: 3, // J
      24: 3, // P
      25: 3, // E
      26: 3, // I
      27: 1, // S
      28: 5, // N
      29: 3, // T
      30: 3, // F
      31: 3, // J
      32: 3, // P
      33: 3, // E
      34: 3, // I
      35: 1, // S
      36: 5, // N
      37: 3, // T
      38: 3, // F
      39: 3, // J
      40: 3, // P
    };
    
    const result = calculateMBTI('quick', answers);
    expect(result.type.charAt(1)).toBe('N');
  });
  
  test('should calculate MBTI type correctly for T type', () => {
    const answers = {
      1: 3, // E
      2: 3, // I
      3: 3, // E
      4: 3, // I
      5: 3, // S
      6: 3, // N
      7: 3, // S
      8: 3, // N
      9: 5, // T
      10: 1, // F
      11: 5, // T
      12: 1, // F
      13: 3, // J
      14: 3, // P
      15: 3, // J
      16: 3, // P
      17: 3, // E
      18: 3, // I
      19: 3, // N
      20: 3, // S
      21: 5, // T
      22: 1, // F
      23: 3, // J
      24: 3, // P
      25: 3, // E
      26: 3, // I
      27: 3, // S
      28: 3, // N
      29: 5, // T
      30: 1, // F
      31: 3, // J
      32: 3, // P
      33: 3, // E
      34: 3, // I
      35: 3, // S
      36: 3, // N
      37: 5, // T
      38: 1, // F
      39: 3, // J
      40: 3, // P
    };
    
    const result = calculateMBTI('quick', answers);
    expect(result.type.charAt(2)).toBe('T');
  });
  
  test('should calculate MBTI type correctly for F type', () => {
    const answers = {
      1: 3, // E
      2: 3, // I
      3: 3, // E
      4: 3, // I
      5: 3, // S
      6: 3, // N
      7: 3, // S
      8: 3, // N
      9: 1, // T
      10: 5, // F
      11: 1, // T
      12: 5, // F
      13: 3, // J
      14: 3, // P
      15: 3, // J
      16: 3, // P
      17: 3, // E
      18: 3, // I
      19: 3, // N
      20: 3, // S
      21: 1, // T
      22: 5, // F
      23: 3, // J
      24: 3, // P
      25: 3, // E
      26: 3, // I
      27: 3, // S
      28: 3, // N
      29: 1, // T
      30: 5, // F
      31: 3, // J
      32: 3, // P
      33: 3, // E
      34: 3, // I
      35: 3, // S
      36: 3, // N
      37: 1, // T
      38: 5, // F
      39: 3, // J
      40: 3, // P
    };
    
    const result = calculateMBTI('quick', answers);
    expect(result.type.charAt(2)).toBe('F');
  });
  
  test('should calculate MBTI type correctly for J type', () => {
    const answers = {
      1: 3, // E
      2: 3, // I
      3: 3, // E
      4: 3, // I
      5: 3, // S
      6: 3, // N
      7: 3, // S
      8: 3, // N
      9: 3, // T
      10: 3, // F
      11: 3, // T
      12: 3, // F
      13: 5, // J
      14: 1, // P
      15: 5, // J
      16: 1, // P
      17: 3, // E
      18: 3, // I
      19: 3, // N
      20: 3, // S
      21: 3, // T
      22: 3, // F
      23: 5, // J
      24: 1, // P
      25: 3, // E
      26: 3, // I
      27: 3, // S
      28: 3, // N
      29: 3, // T
      30: 3, // F
      31: 5, // J
      32: 1, // P
      33: 3, // E
      34: 3, // I
      35: 3, // S
      36: 3, // N
      37: 3, // T
      38: 3, // F
      39: 5, // J
      40: 1, // P
    };
    
    const result = calculateMBTI('quick', answers);
    expect(result.type.charAt(3)).toBe('J');
  });
  
  test('should calculate MBTI type correctly for P type', () => {
    const answers = {
      1: 3, // E
      2: 3, // I
      3: 3, // E
      4: 3, // I
      5: 3, // S
      6: 3, // N
      7: 3, // S
      8: 3, // N
      9: 3, // T
      10: 3, // F
      11: 3, // T
      12: 3, // F
      13: 1, // J
      14: 5, // P
      15: 1, // J
      16: 5, // P
      17: 3, // E
      18: 3, // I
      19: 3, // N
      20: 3, // S
      21: 3, // T
      22: 3, // F
      23: 1, // J
      24: 5, // P
      25: 3, // E
      26: 3, // I
      27: 3, // S
      28: 3, // N
      29: 3, // T
      30: 3, // F
      31: 1, // J
      32: 5, // P
      33: 3, // E
      34: 3, // I
      35: 3, // S
      36: 3, // N
      37: 3, // T
      38: 3, // F
      39: 1, // J
      40: 5, // P
    };
    
    const result = calculateMBTI('quick', answers);
    expect(result.type.charAt(3)).toBe('P');
  });
});