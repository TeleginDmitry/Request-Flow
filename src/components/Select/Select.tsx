import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Props {
  label: string;
  value: string;
  values: any[];
  onChange: (e: SelectChangeEvent<string>) => void;
  required?: boolean;
}

export default function BasicSelect({
  label = "Выберите из списка",
  value,
  values,
  onChange,
  required,
}: Props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          value={value}
          label={label}
          onChange={onChange}
          required={required}
        >
          {values &&
            values.map((value) => (
              <MenuItem key={`select-` + value.id} value={value.id}>
                {value.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}
