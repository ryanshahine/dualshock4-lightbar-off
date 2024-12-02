import HID from 'node-hid';
import crc from 'crc';

/**
 * This script connects to a DUALSHOCK 4 Wireless Controller
 * and turns off its light bar to prevent reflections on MacBook screens.
 */

// Controller name can be changed if your device has a different name
const CONTROLLER_NAME = 'DUALSHOCK 4 Wireless Controller';

// Find the controller among connected HID devices
const devices = HID.devices();
const deviceInfo = devices.find((d) => d.product === CONTROLLER_NAME);

if (!deviceInfo) {
  console.error(`Controller "${CONTROLLER_NAME}" not found.`);
  console.log('Connected HID devices:');
  const deviceProducts = devices
    .map((d) => d.product)
    .filter(Boolean)
    .map((product, index) => `${index + 1}. ${product}`);
  console.log(deviceProducts.join('\n'));
  console.log(`\nIf your device is not listed, make sure it is connected.`);
  console.log(`If your device has a different name, change the CONTROLLER_NAME constant in the script.`);
  process.exit(1);
}

// Initialize the HID device
const device = new HID.HID(deviceInfo.path);

/**
 * Sets the LED colors on the controller.
 * @param {number} ledR - Red color intensity (0-255).
 * @param {number} ledG - Green color intensity (0-255).
 * @param {number} ledB - Blue color intensity (0-255).
 */
function setControllerLight(ledR, ledG, ledB) {
  // Initialize buffer (74 bytes for data, 4 bytes for CRC32)
  const dataBuffer = Buffer.alloc(74);

  // Set report ID and control flags
  dataBuffer[0] = 0x11; // Report ID
  dataBuffer[1] = 0x80;
  dataBuffer[3] = 0x0f;

  // Set LED colors
  dataBuffer[8] = ledR;
  dataBuffer[9] = ledG;
  dataBuffer[10] = ledB;

  // Calculate CRC32 checksum
  const crcBuffer = Buffer.concat([Buffer.from([0xa2]), dataBuffer]);
  const crc32 = crc.crc32(crcBuffer);

  // Append CRC32 to the data buffer
  const finalBuffer = Buffer.concat([
    dataBuffer,
    Buffer.from([crc32 & 0xff, (crc32 >> 8) & 0xff, (crc32 >> 16) & 0xff, (crc32 >> 24) & 0xff]),
  ]);

  // Send the command to the controller
  device.write(Array.from(finalBuffer));
}

/**
 * Turns off the controller's light bar.
 */
function turnOffControllerLight() {
  setControllerLight(0, 0, 0);
}

// Turn off the light bar
turnOffControllerLight();

console.log('Controller light has been turned off.');
