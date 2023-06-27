import { Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "99vh",
  borderRadius: "15px",
  overflowY: "scroll",
  padding: "5px",
}));

export default function Home() {
  return (
    <Grid container spacing={1} padding={0.5}>
      <Grid item md={3} sm={4}>
        <CustomBox>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum modi sequi reiciendis ab
          ullam recusandae, alias soluta totam eligendi molestias officia, nostrum nulla libero
          harum nihil officiis fuga blanditiis. Consequuntur!
        </CustomBox>
      </Grid>
      <Grid item md={9} sm={8}>
        <CustomBox>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam nobis, doloremque
          accusantium, doloribus cupiditate quisquam neque a saepe velit ratione consequuntur nisi
          quia beatae corporis consectetur sint eaque quae in?
        </CustomBox>
      </Grid>
    </Grid>
  );
}
