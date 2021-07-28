import { Icon, Select, useColorMode } from "@chakra-ui/react";
import React from "react";
import { BsBrightnessHighFill } from "react-icons/bs";

export const ColorModePicker = () => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Select
      position="absolute"
      bottom={0}
      right={0}
      margin={4}
      onChange={(e) => setColorMode(e.target.value)}
      value={colorMode}
      icon={<Icon as={BsBrightnessHighFill} />}
      placeholder=""
    >
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </Select>
  );
};

ColorModePicker.displayName = "ColorModePicker";
