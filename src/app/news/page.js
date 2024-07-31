"use client";
import { NavBarTemplate } from "@/components/Navbar/NavBarTemplate";
// import NewsData from "@/components/News/NewsData";
import { NewsDisplay } from "@/components/News/NewsDisplayFind";
// import { NewsDisplayFind } from "@/components/News/NewsDisplayFind";
export default function Learn() {
  return (
    <div>
      <NavBarTemplate>
        {/* <NewsDisplayFind /> */}
        <NewsDisplay />
      </NavBarTemplate>
    </div>
  );
}
