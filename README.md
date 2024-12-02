# DualShock 4 Lightbar Off

A simple Node.js script to turn off the light bar on a DUALSHOCK 4 Wireless Controller. This helps prevent unwanted reflections on screens and conserves battery life when the light bar is not needed.

### Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)
- [Keywords](#keywords)
- [Additional Notes](#additional-notes)

## Overview

The light bar on the DUALSHOCK 4 controller can cause distracting reflections on screens or drain the controller's battery faster. This script connects to the controller and turns off the light bar to provide a more comfortable gaming or work experience.

## Prerequisites

- **Node.js** (v12 or higher)
- **npm** or **yarn**
- **Operating Systems Supported:**
  - **macOS**
  - **Windows**
  - **Linux**

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ryanshahine/dualshock4-lightbar-off.git
    cd dualshock4-lightbar-off
    ```

2. **Install Dependencies**

     Using npm:

     ```bash
     npm install
     ```

     Or using yarn:

     ```bash
     yarn install
     ```

     This will install the following packages:
     - `node-hid`
     - `crc`

## Usage

1. **Connect Your DUALSHOCK 4 Controller**

     Ensure your controller is connected via USB or Bluetooth. Verify that it appears in your system's connected devices.


2. **Run the Script**
     Using npm:

     ```bash
     npm run start
     ```

     Or using yarn:

     ```bash
     yarn start
     ```

    The script will attempt to find the controller and turn off its light bar. If the controller is not found, the script will list connected HID devices and provide instructions.

    > **Note (especially for macOS Users):**
    > You may need to run the script twice. The first run will change the light bar color from white to blue, and the second run will turn it off.

## Troubleshooting

- **Controller Not Detected:**
  - Make sure the controller is properly connected.
  - On some systems, you may need to run the script with elevated permissions (e.g., `sudo` on Linux and macOS).

- **Adjusting the Controller Name:**
  - If your controller has a different product name, update the `CONTROLLER_NAME` constant in `index.js` to match it.
  - To find your controller's product name, check the list of connected devices that the script outputs if it can't find the controller.

## Credits

- StackExchange User [Oblitum](https://gaming.stackexchange.com/users/216349/oblitum) for the initial idea and reference:
  - Post: [How to turn off PS4 controller's light bar on PC?](https://gaming.stackexchange.com/a/336936)
  - Reference to Linux HID driver: [hid-sony.c](https://github.com/torvalds/linux/blob/1e2a199f6ccdc15cf111d68d212e2fd4ce65682e/drivers/hid/hid-sony.c#L1944)
- [Todbot](https://github.com/todbot)'s Node-HID DS4 Test for examples on interfacing with the controller:
  - Repository: [todbot/node-hid-ds4-test](https://github.com/todbot/node-hid-ds4-test)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request for any improvements.

## Contact

For questions or support, feel free to reach out via [Twitter/X](https://x.com/ryanshahine).

## Keywords

DualShock 4, DUALSHOCK 4 Wireless Controller, PS4 Controller, Light Bar, Turn Off Light, Screen Reflection, Node.js, HID Devices, Cross-Platform

## Additional Notes

### Cross-Platform Compatibility

- The script uses `node-hid`, which supports macOS, Windows, and Linux.
- Ensure you have the necessary permissions to access HID devices on your operating system.
- On Windows, you may need to install a driver like `libusb` or run Node.js as an administrator.

### Permissions

- On Linux, you might need to adjust `udev` rules or run the script with `sudo` to access HID devices.
- On macOS, access to HID devices generally requires no special permissions, but running with `sudo` can help if you encounter issues.

### Extending the Script

If you wish to change the color of the light bar instead of turning it off, modify the RGB values in the `turnOffControllerLight` function in `index.js`:

```javascript
function turnOffControllerLight() {
  // Set to a custom color, e.g., blue
  setControllerLight(0, 0, 255);
}
```

### Known Issues

- Some systems may not detect the controller if it's connected via Bluetooth. If you encounter this issue, try connecting the controller via USB.

### Security

- Always be cautious when running scripts that interact with hardware devices.
- Review the code to ensure it meets your security standards.
