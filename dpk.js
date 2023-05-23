const crypto = require('crypto');

/**
 * Computes a partition key for the given event
 * @param {Object} event the event to generate a partition key for.
 * @param {any} event.partitionKey the pre-set partition key to use. Will be checked for max length.
 * @returns {string} the computed partition key
 */
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate = event.partitionKey;
  if (!candidate) {
    candidate = createHash(JSON.stringify(event));
  }

  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};

/**
 * Generates a SHA3-512 hash and returns it's hexadecimal digest
 * @param {Object} data the data to be added to the hash
 * @returns {string} the hex digest of the generated hash
 */
function createHash(data) {
  return crypto.createHash('sha3-512').update(data).digest('hex');
}
