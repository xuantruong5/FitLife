import { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Test() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>("07:00");
  const [items, setItems] = useState([
    { label: "07:00", value: "07:00" },
    { label: "08:00", value: "08:00" },
    { label: "09:00", value: "09:00" },
    { label: "10:00", value: "10:00" },
    { label: "11:00", value: "11:00" },
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Chọn giờ"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  dropdown: {
    borderColor: "#ccc",
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
});