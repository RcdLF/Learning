import CreateNew from "./CreateNew";
// or
import { Box } from '@mui/material';


export default function Header() {

  return (
    <Box mt={2}>
      <h1>To do list :D</h1>
      <CreateNew/>

    </Box>
  )
}
