const { deterministicPartitionKey } = require('./dpk');

const MAX_PARTITION_KEY_LENGTH = 256;

describe('deterministicPartitionKey', () => {
  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });

  it('returns given partition key when it does not exceed max length', () => {
    const partitionKey = 'a'.repeat(MAX_PARTITION_KEY_LENGTH);
    const actual = deterministicPartitionKey({ partitionKey });

    expect(actual).toBe(partitionKey);
  });

  it('returns random partition key when input does not contain partition key', () => {
    const actual = deterministicPartitionKey({});
    expect(actual).not.toBe('0');
  });

  it('returns random key when given partition key exceeds max length', () => {
    const k = 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1);
    const actual = deterministicPartitionKey({ partitionKey: k });

    expect(actual).not.toBe(k);
  });

  it('returns partition key as string when input partition key is not string', () => {
    const partitionKey = Math.floor(Math.random() * 1000);
    const actual = deterministicPartitionKey({ partitionKey });
    expect(actual).toBe(`${partitionKey}`);
  });
});
