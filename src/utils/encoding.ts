export const encodeToField = (input: string): string => {
  // Define Fp as the modulo base
  const Fp = BigInt(
    "8444461749428370424248824938781546531375899335154063827935233455917409239041"
  );

  // Convert string to UTF-8 byte sequence
  const utf8Encoder = new TextEncoder();
  const utf8Bytes = utf8Encoder.encode(input);

  // Convert UTF-8 bytes to little-endian unsigned integer
  let result = BigInt(0);
  for (let i = 0; i < utf8Bytes.length; i++) {
    result += BigInt(utf8Bytes[i]) << BigInt(8 * i); // Little-endian shift
  }

  // Take modulo Fp
  result %= Fp;

  return result + "field";
};
