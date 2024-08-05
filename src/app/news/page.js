"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
import { NewsDisplay } from "@/components/News/NewsDisplayFind";
import { Grid } from "@mantine/core";

export default function Learn() {
  return (
    <div>
      <NavBarTemplate>
        <Grid>
          <Grid.Col span={12}>
            <NewsDisplay />
          </Grid.Col>
        </Grid>  
      </NavBarTemplate>
    </div>
  );
}
